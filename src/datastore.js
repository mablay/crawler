/// <reference path="store.ts" />
/** DEMO APP **/
function runDemo() {
    console.log('RUN DEMO...');
}
exports.runDemo = runDemo;
/** DATA STORE **/
var DataStore = (function () {
    /**
    * @param storeType: 'tingodb' OR 'nedb' (default: 'nedb')
    */
    function DataStore(storeType) {
        this.DEFAULT_STORE_TYPE = 'nedb';
        this.storeType = 'nedb';
        this.storeType = (storeType) ? storeType : this.DEFAULT_STORE_TYPE;
        console.log('StoreType %s', this.storeType);
    }
    return DataStore;
})();
exports.DataStore = DataStore;
//# sourceMappingURL=datastore.js.map