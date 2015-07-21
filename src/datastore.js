function runDemo() {
    console.log('RUN DEMO...');
}
exports.runDemo = runDemo;
var DataStore = (function () {
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