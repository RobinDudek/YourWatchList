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
import { SeriesProvider } from "../../providers/series/series";
import { SerieDetailsPage } from "../serie-details/serie-details";
/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SeriesPage = (function () {
    function SeriesPage(navCtrl, navParams, seriesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.seriesProvider = seriesProvider;
        this.isSearchBarOpened = false;
    }
    SeriesPage.prototype.searchSerie = function (search) {
        var _this = this;
        this.reset();
        this.seriesProvider.getSeries(search)
            .then(function (data) {
            _this.series = data;
            if (_this.series != null) {
                _this.series.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + _this.series.imdbID + '&type=series';
            }
        });
    };
    SeriesPage.prototype.reset = function () {
        this.series = [];
    };
    SeriesPage.prototype.openDetails = function (serieId) {
        this.navCtrl.push(SerieDetailsPage, { serieId: serieId });
    };
    SeriesPage = __decorate([
        Component({
            selector: 'page-series',
            templateUrl: 'series.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, SeriesProvider])
    ], SeriesPage);
    return SeriesPage;
}());
export { SeriesPage };
//# sourceMappingURL=series.js.map