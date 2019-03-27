import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OmdbProvider } from "../../providers/omdb/omdb";
import {EpisodePage} from "../episode/episode";

/**
 * Generated class for the DetailsSaisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-saison',
  templateUrl: 'details-saison.html',
})
export class DetailsSaisonPage {
    saison;
    serieId;
    seasonId;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public omdbProvider: OmdbProvider) {
  }
    goBack() {
        this.navCtrl.pop();
    }
    ionViewDidLoad() {
        this.serieId = this.navParams.get('serieId');
        this.seasonId = this.navParams.get('seasonId');
        this.omdbProvider.getOneSeason(this.serieId, this.seasonId)
            .then(data =>{
                this.saison = data;
                if(this.saison != null)
                    this.saison.Poster = this.omdbProvider.getPoster(this.serieId);
            })
        ;
    }
    openDetails(episode: Object) {
        this.navCtrl.push(EpisodePage,{serieId: this.serieId, seasonId: this.seasonId, episodeNumber: episode['Episode']});
    }
}
