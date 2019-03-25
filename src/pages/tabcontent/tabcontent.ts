import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {MoviesPage} from "../movies/movies";
import {SeriesPage} from "../series/series";
import {ListesPage} from "../listes/listes";

/**
 * Generated class for the TabcontentPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabcontent',
  templateUrl: 'tabcontent.html'
})
export class TabcontentPage {

  moviesRoot = MoviesPage;
  seriesRoot = SeriesPage;
  listesRoot = ListesPage;


  constructor(public navCtrl: NavController) {}

}
