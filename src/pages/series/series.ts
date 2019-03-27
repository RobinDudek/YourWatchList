import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {SeriesProvider} from "../../providers/series/series";
import {SerieDetailsPage} from "../serie-details/serie-details";

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {
    isSearchBarOpened = false;
    series;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public omdbProvider: OmdbProvider, 
    public seriesProvider: SeriesProvider) {
  }

    searchSerie(search: string) {
        this.reset();
        this.seriesProvider.getSeries(search)
            .then(data =>{
                this.series = data;
                if(this.series != null){
                    this.series.Poster = this.omdbProvider.getPoster(this.series.imdbID, 'hd');
                }
            });
    }
    private reset(){
        this.series = [];
    }
    openDetails(serieId:string) {
        this.navCtrl.push(SerieDetailsPage,{serieId: serieId});
    }
}
