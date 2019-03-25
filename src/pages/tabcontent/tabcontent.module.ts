import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabcontentPage } from './tabcontent';

@NgModule({
  declarations: [
    TabcontentPage,
  ],
  imports: [
    IonicPageModule.forChild(TabcontentPage),
  ]
})
export class TabcontentPageModule {}
