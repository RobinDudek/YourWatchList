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
import { StorageProvider } from "../../providers/storage/storage";
import { SocialSharing } from "@ionic-native/social-sharing";
/**
 * Generated class for the EpisodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EpisodePage = /** @class */ (function () {
    function EpisodePage(navCtrl, navParams, detailsProvider, storageProvider, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detailsProvider = detailsProvider;
        this.storageProvider = storageProvider;
        this.socialSharing = socialSharing;
        this.tab = {};
        this.history = [];
        this.favori = false;
    }
    EpisodePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    EpisodePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.serieId = this.navParams.get('serieId');
        console.log(this.serieId);
        this.seasonNumber = this.navParams.get('seasonId');
        this.episodeNumber = this.navParams.get('episodeNumber');
        this.detailsProvider.getEpisode(this.serieId, this.seasonNumber, this.episodeNumber)
            .then(function (data) {
            _this.episode = data;
            _this.storageProvider.get('favori').then(function (data) {
                if (data != null)
                    _this.history = data;
                for (var _i = 0, _a = _this.history; _i < _a.length; _i++) {
                    var item = _a[_i];
                    console.log(item.title);
                    if (item.title == _this.episode.Title)
                        _this.favori = true;
                }
            });
        });
    };
    EpisodePage.prototype.addFavorite = function () {
        var _this = this;
        this.storageProvider.get('favori').then(function (data) {
            if (data != null) {
                _this.history = data;
            }
            _this.tab = {
                'date': new Date(),
                'title': _this.episode.Title,
                'type': "episode",
                'id': _this.serieId,
                'seasonId': _this.seasonNumber,
                'episodeId': _this.episodeNumber
            };
            _this.history.push(_this.tab);
            console.log(_this.tab);
            _this.storageProvider.set('favori', _this.history);
            _this.favori = true;
        });
    };
    EpisodePage.prototype.removeFavorite = function (episode) {
        var tabStorage = [];
        this.storageProvider.get('favori').then(function (data) { tabStorage = data; });
        tabStorage.splice(tabStorage.indexOf(episode), 1);
        this.storageProvider.set('favori', tabStorage);
        this.favori = false;
    };
    EpisodePage.prototype.share = function (poster) {
        this.socialSharing.share('Partage de l image', null, poster, null)
            .then(function () {
        }).catch(function () {
        });
    };
    EpisodePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-episode',
            templateUrl: 'episode.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DetailsProvider, StorageProvider, SocialSharing])
    ], EpisodePage);
    return EpisodePage;
}());
export { EpisodePage };
//# sourceMappingURL=episode.js.map