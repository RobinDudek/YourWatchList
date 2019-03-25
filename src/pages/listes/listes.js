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
import { IonicPage, NavController } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { EpisodePage } from "../episode/episode";
import { DetailsPage } from "../details/details";
import { SerieDetailsPage } from "../serie-details/serie-details";
import { ImportListProvider } from "../../providers/import-list/import-list";
import { ExportListProvider } from "../../providers/export-list/export-list";
/**
 * Generated class for the ListesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListesPage = /** @class */ (function () {
    function ListesPage(navCtrl, storage, importListProvider, exportListProvider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.importListProvider = importListProvider;
        this.exportListProvider = exportListProvider;
        this.tabStorage = [];
    }
    ListesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('favori').then(function (data) { _this.tabStorage = data; });
    };
    ListesPage.prototype.removeFavorite = function (history) {
        this.tabStorage.splice(this.tabStorage.indexOf(history), 1);
        this.storage.set('favori', this.tabStorage);
    };
    ListesPage.prototype.openDetails = function (historyId, seasonId, episodeId, type) {
        console.log(type);
        if (type == 'episode') {
            this.navCtrl.push(EpisodePage, { serieId: historyId, seasonId: seasonId, episodeNumber: episodeId });
        }
        else if (type == 'film') {
            this.navCtrl.push(DetailsPage, { movieId: historyId });
        }
        else {
            this.navCtrl.push(SerieDetailsPage, { serieId: historyId });
        }
    };
    ListesPage.prototype.removeAll = function () {
        this.storage.clear();
        this.tabStorage = [];
    };
    ListesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listes',
            templateUrl: 'listes.html',
        }),
        __metadata("design:paramtypes", [NavController, StorageProvider, ImportListProvider, ExportListProvider])
    ], ListesPage);
    return ListesPage;
}());
export { ListesPage };
//# sourceMappingURL=listes.js.map