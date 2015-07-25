/// <reference path="../typings/tsd.d.ts" />
/**
 * Created by marc on 24/07/15.
 */

var totalYield = [
    {
        data: {
            movieId: 3828462,
            title: 'ddd',
            duration: 123,
            thumbnail: 'http://www.com/thumb.jpg',
            thumbnailAlt: {
                url: 'http://...',
                path: 'dl/',
                filename: null,
            },
            image: 'http://...',
            videos: {
                a: "...",
                b: "...",
                c: "...",
            }
        },
        assets: [
            'thumbnail',
            'thumbnailAlt',
            'image'
        ],
        tasks: [
            {
                data: {
                    image: 'http://...'
                },
                assets:['image']
            },
            {
                data: {
                    videos: {
                        a: "...",
                        b: "...",
                        c: "...",
                    }
                },
                assets:[]
            }
        ]

    }
];

import async = require('async');
import request = require('request-promise');
import nedb = require('nedb');
var db = new nedb({ filename: 'data/', autoload: true });

class Task {
    url: String;
    behavior: Behavior;
    parent: Task;

    constructor(url:String, behavior:Behavior, parent?:Task) {
        this.url = url;
        this.behavior = behavior;
        this.parent = parent || null;
    }
}

class Yield {
    _id:String;
    data:Object;
    download:Array<String>;
    queue:Array<Task>;
}


class DefaultBehavior implements Behavior {

    filter(url:String) {}

    cache(url:String) {}

    parse(payload:String) {
        return new Yield();
    }

}

/**
 *
 */
interface Behavior {

    /**
     * @return false to cancel this task, another url to proceed with or nothing to proceed
     */
    filter(url:String):any;

    /**
     * @return the cached page if available, nothing if not.
     * @param url
     */
    cache(url:String):any;

    parse(payload:String):Yield;

}

// Init crawler queue with Async.queue and Worker
/**
 * task: CrawlerBehavior
 * @type {AsyncQueue<T>}
 */
var q = async.queue(function(task:Task, callback) {
    // The worker is expecting the queued element (task) to be
    // a url linked to a crawling behavior

    // Before Load
    if (!task.behavior.filter(task.url)) {
        var err = new Error('Crawling behavior canceled for url ' + task.url);
        callback(err);
        return;
    }

    // Load
    request(task.url).then(function (body){
        // Digest
        var y = task.behavior.parse(body);
        console.log('crawled data: '+y.data);

        // 1. Insert y to DB => recordId
        db.insert(y, function(err, record){
           console.log('[DB] inserted ', record._id);
        });
        // 2. Queue subtasks
        // 3. Resolve this task with callback
    })
    .catch(function (err){
        console.log('[REQUEST] Error: ', err);
    })
    .finally(callback);


}, 2);

export function queue(url:String, behavior:Behavior) {
    var task = new Task(url, behavior);
    q.push(task, function(err){
        console.log('Something went wrong: ', err);
    });
}