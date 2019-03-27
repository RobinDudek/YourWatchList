import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {StorageProvider} from "../../providers/storage/storage";
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the EpisodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
})
export class EpisodePage {
    episodeNumber;
    seasonNumber;
    serieId;
    episode;
    tab = {};
    history = [];
    favori:boolean =false;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public omdbProvider: OmdbProvider, 
    private storageProvider: StorageProvider, 
    private socialSharing: SocialSharing) {
  }
    goBack() {
        this.navCtrl.pop();
    }
  ionViewWillEnter() {
      this.serieId = this.navParams.get('serieId');
      console.log(this.serieId);
      this.seasonNumber = this.navParams.get('seasonId');
      this.episodeNumber = this.navParams.get('episodeNumber');
      this.omdbProvider.getEpisode(this.serieId, this.seasonNumber, this.episodeNumber)
          .then(data =>{
              this.episode = data;
              this.episode.Poster = this.omdbProvider.getPoster(this.episode.imdbID, 'standard');

              this.storageProvider.get('favori').then((data) => {
                  if(data != null)
                  this.history = data;
                      for(let item of this.history){
                          console.log(item.title);
                          if(item.title == this.episode.Title)
                              this.favori = true;
                      }
              });
          });
  }
    addFavorite() {
        this.storageProvider.get('favori').then((data) => {
            if(data != null){
                this.history = data;
            }
            this.tab = {
                'date' : new Date(),
                'title' : this.episode.Title,
                'type' : "episode",
                'id' : this.serieId,
                'seasonId': this.seasonNumber,
                'episodeId': this.episodeNumber
            };
            this.history.push(this.tab);
            console.log(this.tab);
            this.storageProvider.set('favori',this.history);
            this.favori = true;
        });
    }
    removeFavorite(episode: Object){
      let tabStorage = [];
        this.storageProvider.get('favori').then((data)=>{tabStorage =data});

        tabStorage.splice(tabStorage.indexOf(episode),1);
        this.storageProvider.set('favori', tabStorage);
        this.favori = false;
    }
    share(poster: string) {

        this.socialSharing.share('Partage de l image', null, poster, null)
            .then(() => {
            }).catch(() => {

        })
    }
}
