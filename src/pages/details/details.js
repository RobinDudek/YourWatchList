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
import { NavController, NavParams } from 'ionic-angular';
import { DetailsProvider } from "../../providers/details/details";
import { StorageProvider } from "../../providers/storage/storage";
import { SocialSharing } from "@ionic-native/social-sharing";
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailsPage = /** @class */ (function () {
    function DetailsPage(navCtrl, navParams, detailsProvider, storageProvider, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detailsProvider = detailsProvider;
        this.storageProvider = storageProvider;
        this.socialSharing = socialSharing;
        this.tab = {};
        this.history = [];
        this.favori = false;
    }
    DetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.movieId = this.navParams.get('movieId');
        this.detailsProvider.getMovieDetails(this.movieId)
            .then(function (data) {
            _this.movie = data;
            if (_this.movie != null) {
                _this.movie.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + _this.movie.imdbID;
                _this.storageProvider.get('favori').then(function (data) {
                    if (data != null)
                        _this.history = data;
                    for (var _i = 0, _a = _this.history; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.title == _this.movie.Title)
                            _this.favori = true;
                    }
                });
            }
        });
    };
    DetailsPage.prototype.addFavorite = function () {
        var _this = this;
        this.storageProvider.get('favori').then(function (data) {
            if (data != null) {
                _this.history = data;
            }
            _this.tab = {
                'date': new Date(),
                'title': _this.movie.Title,
                'type': "film",
                'id': _this.movie.imdbID,
                'seasonId': null,
                'episodeId': null
            };
            _this.history.push(_this.tab);
            console.log(_this.tab);
            _this.storageProvider.set('favori', _this.history);
            _this.favori = true;
        });
    };
    DetailsPage.prototype.removeFavorite = function (movie) {
        var tabStorage = [];
        this.storageProvider.get('favori').then(function (data) { tabStorage = data; });
        tabStorage.splice(tabStorage.indexOf(movie), 1);
        this.storageProvider.set('favori', tabStorage);
        this.favori = false;
    };
    DetailsPage.prototype.share = function (poster) {
        this.socialSharing.share('Partage de l image', null, poster, null)
            .then(function () {
        }).catch(function () {
        });
    };
    DetailsPage = __decorate([
        Component({
            selector: 'page-details',
            templateUrl: 'details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DetailsProvider, StorageProvider, SocialSharing])
    ], DetailsPage);
    return DetailsPage;
}());
export { DetailsPage };
//# sourceMappingURL=details.js.map