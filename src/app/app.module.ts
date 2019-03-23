import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import {TabcontentPage} from "../pages/tabcontent/tabcontent";
import {ListesPage} from "../pages/listes/listes";
import {MoviesPage} from "../pages/movies/movies";
import {SeriesPage} from "../pages/series/series";
import {DetailsPage} from "../pages/details/details";
import {DetailsSaisonPage} from "../pages/details-saison/details-saison";
import {SerieDetailsPage} from "../pages/serie-details/serie-details";
import {EpisodePage} from "../pages/episode/episode";

import { MoviesProvider } from '../providers/movies/movies';
import { SeriesProvider } from '../providers/series/series';
import { DetailsProvider } from '../providers/details/details';
import { StorageProvider } from '../providers/storage/storage';
import { ImportListProvider } from '../providers/import-list/import-list';
import { ExportListProvider } from '../providers/export-list/export-list';
import { YoutubeProvider } from '../providers/youtube/youtube';

import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {HttpClientModule} from "@angular/common/http";
import {SocialSharing} from "@ionic-native/social-sharing";
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    TabcontentPage,
    ListesPage,
    MoviesPage,
    SeriesPage,
    DetailsPage,
    DetailsSaisonPage,
    SerieDetailsPage,
    EpisodePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabcontentPage,
    ListesPage,
    MoviesPage,
    SeriesPage,
    DetailsPage,
    DetailsSaisonPage,
    SerieDetailsPage,
    EpisodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}  ,  
    MoviesProvider,
    SeriesProvider,
    DetailsProvider,
    StorageProvider,
    SocialSharing,
    ImportListProvider,
    ExportListProvider,
    YoutubeProvider,
    FileChooser,
    FilePath
  ]
})
export class AppModule {}
