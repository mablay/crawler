/// <reference path="../typings/tsd.d.ts" />
var assert = require('assert');
var TingoDB = require('tingodb')().Db;
var Promise = require('promise');
var db = new TingoDB('data/', {});
var collection = db.collection("object-store.tingo");
var insert = function (data) {
    return new Promise(function (resolve, reject) {
        collection.insert(data, function (err, result) {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
};
exports.search = function (query) {
    query = query || {};
    var findPromise = collection.find(query, function (err, item) {
        //assert.equal(null, err);
        console.log('[find] ... ');
    });
    console.log('Find promise: ', findPromise);
};
var clear = function () {
    collection.remove({});
};
var initDummyData = function () {
    clear();
    var objects = [{
        name: 'alice',
        url: 'http://abc.com',
        behavior: 'default'
    }, {
        name: 'bob',
        url: 'http://def.com',
        behavior: 'default'
    }];
    //console.log('Objects ', objects);
    insert(objects).then(function (data) {
        console.log('THEN ', data);
    });
};
initDummyData();
//search({behavior:'default'});
//# sourceMappingURL=store-tingodb.js.map