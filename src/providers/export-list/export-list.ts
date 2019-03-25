import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {StorageProvider} from "../storage/storage";

/*
  Generated class for the ExportListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExportListProvider {

  constructor(public http: HttpClient,private storageProvider: StorageProvider) {
  }
  public toJSON(){
    let tabStorage= this.storageProvider.get('favori');

  }
  public toCSV(){

  }
}
