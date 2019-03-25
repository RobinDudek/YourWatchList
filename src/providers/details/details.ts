import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DetailsProvider {
    apiUrl = 'http://www.omdbapi.com/?apikey=75522b56&';
  constructor(public http: HttpClient) {
  }

    public getMovieDetails(movieId: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + movieId+ '&plot=full')
                .subscribe(data => {
                    // @ts-ignore
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }
    public getSeasonDetails(serieId: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + serieId+ '&plot=full')
                .subscribe(data => {
                    // @ts-ignore
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
                    // @ts-ignore
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
                    // @ts-ignore
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }
}
