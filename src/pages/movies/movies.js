var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviesProvider } from "../../providers/movies/movies";
import { DetailsPage } from "../details/details";
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MoviesPage = /** @class */ (function () {
    function MoviesPage(navCtrl, navParams, moviesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.moviesProvider = moviesProvider;
        this.isSearchBarOpened = false;
    }
    MoviesPage.prototype.searchMovie = function (search) {
        var _this = this;
        this.reset();
        this.moviesProvider.getMovies(search)
            .then(function (data) {
            _this.movies = data;
            if (_this.movies != null) {
                
                _this.movies.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + _this.movies.imdbID + '&type=movies';
            } else {

            }
        });
    };
    MoviesPage.prototype.reset = function () {
        this.movies = [];
    };
    MoviesPage.prototype.openDetails = function (movieId) {
        this.navCtrl.push(DetailsPage, { movieId: movieId });
    };
    MoviesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-movies',
            templateUrl: 'movies.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, MoviesProvider])
    ], MoviesPage);
    return MoviesPage;
}());
export { MoviesPage };
//# sourceMappingURL=movies.js.map