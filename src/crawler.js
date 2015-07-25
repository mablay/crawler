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
                filename: null
            },
            image: 'http://...',
            videos: {
                a: "...",
                b: "...",
                c: "..."
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
                assets: ['image']
            },
            {
                data: {
                    videos: {
                        a: "...",
                        b: "...",
                        c: "..."
                    }
                },
                assets: []
            }
        ]
    }
];
var async = require('async');
var request = require('request-promise');
var nedb = require('nedb');
var db = new nedb({ filename: 'data/', autoload: true });
var Task = (function () {
    function Task(url, behavior, parent) {
        this.url = url;
        this.behavior = behavior;
        this.parent = parent || null;
    }
    return Task;
})();
var Yield = (function () {
    function Yield() {
    }
    return Yield;
})();
var DefaultBehavior = (function () {
    function DefaultBehavior() {
    }
    DefaultBehavior.prototype.filter = function (url) {
    };
    DefaultBehavior.prototype.cache = function (url) {
    };
    DefaultBehavior.prototype.parse = function (payload) {
        return new Yield();
    };
    return DefaultBehavior;
})();
// Init crawler queue with Async.queue and Worker
/**
 * task: CrawlerBehavior
 * @type {AsyncQueue<T>}
 */
var q = async.queue(function (task, callback) {
    // The worker is expecting the queued element (task) to be
    // a url linked to a crawling behavior
    // Before Load
    if (!task.behavior.filter(task.url)) {
        var err = new Error('Crawling behavior canceled for url ' + task.url);
        callback(err);
        return;
    }
    // Load
    request(task.url).then(function (body) {
        // Digest
        var y = task.behavior.parse(body);
        console.log('crawled data: ' + y.data);
        // 1. Insert y to DB => recordId
        db.insert(y, function (err, record) {
            console.log('[DB] inserted ', record._id);
        });
        // 2. Queue subtasks
        // 3. Resolve this task with callback
    }).catch(function (err) {
        console.log('[REQUEST] Error: ', err);
    }).finally(callback);
}, 2);
function queue(url, behavior) {
    var task = new Task(url, behavior);
    q.push(task, function (err) {
        console.log('Something went wrong: ', err);
    });
}
exports.queue = queue;
//# sourceMappingURL=crawler.js.map