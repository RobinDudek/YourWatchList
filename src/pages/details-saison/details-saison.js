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
import { EpisodePage } from "../episode/episode";
/**
 * Generated class for the DetailsSaisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailsSaisonPage = /** @class */ (function () {
    function DetailsSaisonPage(navCtrl, navParams, detailsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detailsProvider = detailsProvider;
    }
    DetailsSaisonPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DetailsSaisonPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.serieId = this.navParams.get('serieId');
        this.seasonId = this.navParams.get('seasonId');
        this.detailsProvider.getOneSeason(this.serieId, this.seasonId)
            .then(function (data) {
            _this.saison = data;
            if (_this.saison != null)
                _this.saison.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + _this.serieId;
        });
    };
    DetailsSaisonPage.prototype.openDetails = function (episode) {
        this.navCtrl.push(EpisodePage, { serieId: this.serieId, seasonId: this.seasonId, episodeNumber: episode['Episode'] });
    };
    DetailsSaisonPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-details-saison',
            templateUrl: 'details-saison.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DetailsProvider])
    ], DetailsSaisonPage);
    return DetailsSaisonPage;
}());
export { DetailsSaisonPage };
//# sourceMappingURL=details-saison.js.map