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
import { DetailsProvider } from "../../providers/details/details";
import { DetailsSaisonPage } from "../details-saison/details-saison";
import { StorageProvider } from "../../providers/storage/storage";
/**
 * Generated class for the SerieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SerieDetailsPage = /** @class */ (function () {
    function SerieDetailsPage(navCtrl, navParams, detailsProvider, storageProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detailsProvider = detailsProvider;
        this.storageProvider = storageProvider;
        this.seasonNumber = [];
        this.tab = {};
        this.history = [];
        this.favori = false;
    }
    SerieDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SerieDetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var serieId = this.navParams.get('serieId');
        this.detailsProvider.getSeasonDetails(serieId)
            .then(function (data) {
            _this.serie = data;
            if (_this.serie != null) {
                _this.serie.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + _this.serie.imdbID;
            }
            for (var i = 0; i < _this.serie.totalSeasons; i++) {
                _this.seasonNumber.push(i + 1);
            }
        });
    };
    SerieDetailsPage.prototype.openDetails = function (serieId, seasonId) {
        this.navCtrl.push(DetailsSaisonPage, { serieId: serieId, seasonId: seasonId });
    };
    SerieDetailsPage.prototype.addFavorite = function () {
        var _this = this;
        this.storageProvider.get('favori').then(function (data) {
            if (data != null) {
                _this.history = data;
            }
            _this.tab = {
                'date': new Date(),
                'title': _this.serie.Title,
                'type': "serie",
                'id': _this.serie.imdbID,
                'seasonId': null,
                'episodeId': null
            };
            _this.history.push(_this.tab);
            console.log(_this.tab);
            _this.storageProvider.set('favori', _this.history);
            _this.favori = true;
        });
    };
    SerieDetailsPage.prototype.removeFavorite = function (serie) {
        var tabStorage = [];
        this.storageProvider.get('favori').then(function (data) { tabStorage = data; });
        tabStorage.splice(tabStorage.indexOf(serie), 1);
        this.storageProvider.set('favori', tabStorage);
        this.favori = false;
    };
    SerieDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-serie-details',
            templateUrl: 'serie-details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DetailsProvider, StorageProvider])
    ], SerieDetailsPage);
    return SerieDetailsPage;
}());
export { SerieDetailsPage };
//# sourceMappingURL=serie-details.js.map