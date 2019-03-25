var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the SeriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SeriesProvider = /** @class */ (function () {
    function SeriesProvider(http) {
        this.http = http;
        this.apiUrl = 'http://www.omdbapi.com/?apikey=75522b56&';
    }
    SeriesProvider.prototype.getSeries = function (search) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + 's=' + search + '&type=series')
                .subscribe(function (data) {
                // @ts-ignore
                resolve(data.Search);
            }, function (err) {
                console.log(err);
            });
        });
    };
    SeriesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], SeriesProvider);
    return SeriesProvider;
}());
export { SeriesProvider };
//# sourceMappingURL=series.js.map