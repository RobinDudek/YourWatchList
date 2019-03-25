import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

    constructor(public http: HttpClient, private storage:Storage) {
    }
    public async set(settingName,value){
        return await this.storage.set(`setting:${ settingName }`,value);
    }
    public async get(settingName){
        return await this.storage.get(`setting:${ settingName }`);
    }
    public async remove(settingName){
        return await this.storage.remove(`setting:${ settingName }`);
    }
    public clear() {
        this.storage.clear().then(() => {
            console.log('all keys cleared');
        });
    }
    public async length(){
        return await this.storage.length();
    }
}
