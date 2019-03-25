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
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MoviesProvider = /** @class */ (function () {
    function MoviesProvider(http) {
        this.http = http;
        this.apiUrl = 'http://www.omdbapi.com/?apikey=75522b56&';
    }
    MoviesProvider.prototype.getMovies = function (search) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + 's=' + search + '&type=movie')
            .subscribe(function (data) {
                // @ts-ignore
                resolve(data.Search);
            }, function (err) {
                console.log(err);
                rejects
            });
        });
    };
    MoviesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], MoviesProvider);
    return MoviesProvider;
}());
export { MoviesProvider };
//# sourceMappingURL=movies.js.map