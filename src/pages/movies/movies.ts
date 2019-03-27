import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoviesProvider} from "../../providers/movies/movies";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
    isSearchBarOpened = false;
    movies;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     public moviesProvider: MoviesProvider) {
  }

    searchMovie(search: string) {
        this.reset();
        this.moviesProvider.getMovies(search)
            .then(data =>{
                this.movies = data;
                if(this.movies != null){
                this.movies.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.movies.imdbID+'&type=movies';
                }
            })
        ;
    }
    private reset(){
        this.movies = [];
    }
    openDetails(movieId:string) {
        this.navCtrl.push(DetailsPage,{movieId: movieId});
    }

}
