import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {StorageProvider} from "../storage/storage";

/*
  Generated class for the ImportListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImportListProvider {
    public csvItems : any;
    public jsonItems: any;
  constructor(public http: HttpClient, private fileChooser: FileChooser, private filePath: FilePath,private storageProvider: StorageProvider) {
  }

    public async importFavoriteList(): Promise<void> {
        const uri = await this.fileChooser.open();
        const nativePath = await this.filePath.resolveNativePath(uri);

        if (nativePath.endsWith('.csv')) {
            this.loadCSV(nativePath);
        } else if (nativePath.endsWith('.json')) {
            this.loadJSON(nativePath);
        } else {
          console.log('wrong extension')
        }
    }

    public async loadJSON(nativePath: string): Promise <void> {
        this.http.get(nativePath).subscribe(data => {
            this.jsonItems = data;
            this.storageProvider.set('favori', this.jsonItems);
        });
    }
    async loadCSV(nativePath: string){
        this.http.get(nativePath)
            .subscribe((data)=>
            {
                this.csvItems = this.parseCSVFile(data);
                this.storageProvider.set('favori', this.csvItems);
            });
    }

    private parseCSVFile(str)
    {
        let arr  = [],
            row,
            col,
            c,
            quote   = false;
        for (row = col = c = 0; c < str.length; c++)
        {
            let cc = str[c],
                nc = str[c+1];
            arr[row] = arr[row] || [];
            arr[row][col] = arr[row][col] || '';

            if (cc == '"' && quote && nc == '"'){
                arr[row][col] += cc;
                ++c;
                continue;
            }
            if (cc == '"'){
                quote = !quote;
                continue;
            }
            if (cc == ',' && !quote){
                ++col;
                continue;
            }
            if (cc == '\n' && !quote)
            {
                ++row;
                col = 0;
                continue;
            }
            arr[row][col] += cc;
        }

        return this.formatParsedObject(arr, true);
    }
    private formatParsedObject(arr, hasTitles)
    {
        let obj = [], date, title, type, id, seasonId, episodeId;

        for(let j = 0; j < arr.length; j++){
            let items = arr[j];
            if(items.indexOf("") === -1){
                if(hasTitles === true && j === 0){
                    date = items[0];
                    title = items[1];
                    type = items[2];
                    id = items[3];
                    seasonId = items[4];
                    episodeId = items[5];
                }
                else
                {
                    obj.push({
                        'date' : items[0],
                        'title' : items[1],
                        'type' : items[2],
                        'id' : items[3],
                        'seasonId': items[4],
                        'episodeId': items[5]
                    });
                }
            }
        }
        return obj;
    }
}
