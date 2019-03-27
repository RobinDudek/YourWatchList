import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/*
  Generated class for the OmdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OmdbProvider {
    apiUrl = 'http://www.omdbapi.com/?apikey=75522b56&';
    imgUrl = 'http://img.omdbapi.com/?apikey=75522b56&';
  constructor(public http: HttpClient,
            private platform: Platform) {
  }

    public getMovie(movieId: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + movieId+ '&plot=full')
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }
    public getSeasons(serieId: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + serieId+ '&plot=full')
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }
    public getOneSeason(serieId: string, season: number) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + serieId+ '&season='+ season +'&plot=full')
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }
    public getEpisode(serieId: string, season: number, episodeNumber: number){
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + serieId+ '&season='+ season +'&Episode='+ episodeNumber +'&plot=full')
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }

    public getPoster(itemId: string, quality: string){
        if (this.platform.is('cordova') && quality == "hd") {
            return this.imgUrl + 'i=' + itemId + '&h=720';
        } else {
            return this.imgUrl + 'i=' + itemId + '&plot=full';
        }
    }     
}
