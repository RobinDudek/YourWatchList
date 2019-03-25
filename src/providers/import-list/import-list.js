var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { StorageProvider } from "../storage/storage";
/*
  Generated class for the ImportListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ImportListProvider = /** @class */ (function () {
    function ImportListProvider(http, fileChooser, filePath, storageProvider) {
        this.http = http;
        this.fileChooser = fileChooser;
        this.filePath = filePath;
        this.storageProvider = storageProvider;
    }
    ImportListProvider.prototype.importFavoriteList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uri, nativePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileChooser.open()];
                    case 1:
                        uri = _a.sent();
                        return [4 /*yield*/, this.filePath.resolveNativePath(uri)];
                    case 2:
                        nativePath = _a.sent();
                        if (nativePath.endsWith('.csv')) {
                            this.loadCSV(nativePath);
                        }
                        else if (nativePath.endsWith('.json')) {
                            this.loadJSON(nativePath);
                        }
                        else {
                            console.log('wrong extension');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportListProvider.prototype.loadJSON = function (nativePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.http.get(nativePath).subscribe(function (data) {
                    _this.jsonItems = data;
                    _this.storageProvider.set('favori', _this.jsonItems);
                });
                return [2 /*return*/];
            });
        });
    };
    ImportListProvider.prototype.loadCSV = function (nativePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.http.get(nativePath)
                    .subscribe(function (data) {
                    _this.csvItems = _this.parseCSVFile(data);
                    _this.storageProvider.set('favori', _this.csvItems);
                });
                return [2 /*return*/];
            });
        });
    };
    ImportListProvider.prototype.parseCSVFile = function (str) {
        var arr = [], row, col, c, quote = false;
        for (row = col = c = 0; c < str.length; c++) {
            var cc = str[c], nc = str[c + 1];
            arr[row] = arr[row] || [];
            arr[row][col] = arr[row][col] || '';
            if (cc == '"' && quote && nc == '"') {
                arr[row][col] += cc;
                ++c;
                continue;
            }
            if (cc == '"') {
                quote = !quote;
                continue;
            }
            if (cc == ',' && !quote) {
                ++col;
                continue;
            }
            if (cc == '\n' && !quote) {
                ++row;
                col = 0;
                continue;
            }
            arr[row][col] += cc;
        }
        return this.formatParsedObject(arr, true);
    };
    ImportListProvider.prototype.formatParsedObject = function (arr, hasTitles) {
        var obj = [], date, title, type, id, seasonId, episodeId;
        for (var j = 0; j < arr.length; j++) {
            var items = arr[j];
            if (items.indexOf("") === -1) {
                if (hasTitles === true && j === 0) {
                    date = items[0];
                    title = items[1];
                    type = items[2];
                    id = items[3];
                    seasonId = items[4];
                    episodeId = items[5];
                }
                else {
                    obj.push({
                        'date': items[0],
                        'title': items[1],
                        'type': items[2],
                        'id': items[3],
                        'seasonId': items[4],
                        'episodeId': items[5]
                    });
                }
            }
        }
        return obj;
    };
    ImportListProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, FileChooser, FilePath, StorageProvider])
    ], ImportListProvider);
    return ImportListProvider;
}());
export { ImportListProvider };
//# sourceMappingURL=import-list.js.map