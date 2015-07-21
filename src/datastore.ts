/// <reference path="../typings/tsd.d.ts" />
/// <reference path="store.ts" />


/** DEMO APP **/
export function runDemo() {
    console.log('RUN DEMO...');
}


/** DATA STORE **/
export class DataStore {

  DEFAULT_STORE_TYPE = 'nedb';
  storeType = 'nedb';

  /**
  * @param storeType: 'tingodb' OR 'nedb' (default: 'nedb')
  */
  constructor(storeType) {
    this.storeType = (storeType) ? storeType : this.DEFAULT_STORE_TYPE;
    console.log('StoreType %s', this.storeType);
  }


}
