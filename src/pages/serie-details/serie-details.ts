import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {DetailsSaisonPage} from "../details-saison/details-saison";
import {StorageProvider} from "../../providers/storage/storage";
import {SocialSharing} from "@ionic-native/social-sharing";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeProvider } from '../../providers/youtube/youtube';

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

    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        private platform: Platform,
        public omdbProvider: OmdbProvider, 
        private storageProvider: StorageProvider,
        private socialSharing: SocialSharing,
        private youtubeVideoPlayer: YoutubeVideoPlayer,
        private youtubeProvider: YoutubeProvider) {
    }

    goBack() {
        this.navCtrl.pop();
    }
    ionViewDidLoad() {
        const serieId = this.navParams.get('serieId');
        this.omdbProvider.getSeasons(serieId)
            .then(data =>{
                this.serie = data;
                if(this.serie != null){
                    this.serie.Poster = this.omdbProvider.getPoster(this.serie.imdbID, "hd");
                }
                for (let i=0;i <this.serie.totalSeasons;i++){
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
    
    openTrailer() {
        this.youtubeProvider.getIdByTitle(this.serie.Title).then((data) => {
          const videoId = data.items[0].id.videoId;
          if (videoId) {
            if (this.platform.is('cordova')) {
              this.youtubeVideoPlayer.openVideo(videoId);
            } else {
              window.open('https://www.youtube.com/watch?v=' + videoId);
            }
          }
        });
    }
}
