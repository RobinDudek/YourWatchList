import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListesPage } from './listes';

@NgModule({
  declarations: [
    ListesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListesPage),
  ],
})
export class ListesPageModule {}
