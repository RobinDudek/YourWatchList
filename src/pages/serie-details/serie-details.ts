import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailsProvider} from "../../providers/details/details";
import {DetailsSaisonPage} from "../details-saison/details-saison";
import {StorageProvider} from "../../providers/storage/storage";

/**
 * Generated class for the SerieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie-details',
  templateUrl: 'serie-details.html',
})
export class SerieDetailsPage {
    serie;
    seasonNumber = [];
    tab = {};
    history = [];
    favori:boolean =false;

    constructor(public navCtrl: NavController, public navParams: NavParams,public detailsProvider: DetailsProvider, private storageProvider: StorageProvider) {
    }

    goBack() {
        this.navCtrl.pop();
    }
    ionViewDidLoad() {
        const serieId = this.navParams.get('serieId');
        this.detailsProvider.getSeasonDetails(serieId)
            .then(data =>{
                this.serie = data;
                if(this.serie != null){
                    this.serie.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.serie.imdbID;
                }
                for (let i=0;i <this.serie.totalSeasons;i++ ){
                    this.seasonNumber.push(i+1);
                }
            });
    }
    openDetails(serieId:string, seasonId: number) {
        this.navCtrl.push(DetailsSaisonPage,{serieId: serieId, seasonId: seasonId});
    }
    addFavorite() {
        this.storageProvider.get('favori').then((data) => {
            if(data != null){
                this.history = data;
            }
            this.tab = {
                'date' : new Date(),
                'title' : this.serie.Title,
                'type' : "serie",
                'id' : this.serie.imdbID,
                'seasonId': null,
                'episodeId': null
            };
            this.history.push(this.tab);
            console.log(this.tab);
            this.storageProvider.set('favori',this.history);
            this.favori = true;
        });
    }
    removeFavorite(serie: any){
        let tabStorage = [];
        this.storageProvider.get('favori').then((data)=>{tabStorage =data});

        tabStorage.splice(tabStorage.indexOf(serie),1);
        this.storageProvider.set('favori', tabStorage);
        this.favori = false;
    }
}
