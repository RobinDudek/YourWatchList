import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {DetailsProvider} from "../../providers/details/details";
import {StorageProvider} from "../../providers/storage/storage";
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
    movieId;
    movie;
    tab = {};
    history = [];
    favori:boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public detailsProvider: DetailsProvider, private storageProvider: StorageProvider, private socialSharing: SocialSharing) {

  }
    goBack() {
        this.navCtrl.pop();
    }
  ionViewDidLoad() {
      this.movieId = this.navParams.get('movieId');
      this.detailsProvider.getMovieDetails(this.movieId)
          .then(data =>{
              this.movie = data;
              console.log(this.movie);
              if(this.movie != null){
                  this.movie.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.movie.imdbID;
                  this.storageProvider.get('favori').then((data) => {
                      if(data != null)
                          this.history = data;
                      for(let item of this.history){
                          if(item.title == this.movie.Title)
                              this.favori = true;
                      }
                  });
              }
          });
  }
    addFavorite() {
        this.storageProvider.get('favori').then((data) => {
            if(data != null){
                this.history = data;
            }
            this.tab = {
                'date' : new Date(),
                'title' : this.movie.Title,
                'type' : "film",
                'id' : this.movie.imdbID,
                'seasonId': null,
                'episodeId': null
            };
            this.history.push(this.tab);
            console.log(this.tab);
            this.storageProvider.set('favori',this.history);
            this.favori = true;
        });
    }
    removeFavorite(movie: Object){
        let tabStorage = [];
        this.storageProvider.get('favori').then((data)=>{tabStorage =data});

        tabStorage.splice(tabStorage.indexOf(movie),1);
        this.storageProvider.set('favori', tabStorage);
        this.favori = false;
    }
    share(poster: string) {

        this.socialSharing.share('Partage de l image', null, poster, null)
            .then(() => {
            }).catch(() => {

        })
    }

    private openTrailer() {
        this.youtubeProvider.getIdByTitle(this.allInfos.Title).then((data) => {
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
