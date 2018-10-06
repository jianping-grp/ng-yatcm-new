import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {ContactComponent} from './contact/contact.component';
import {SearchComponent} from './search/search.component';
import {SharedModule} from '../../../shared/shared.module';
import { SeaComponent } from './sea/sea.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
    SearchComponent,
    SeaComponent
  ],
  exports: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
    SearchComponent,
    SeaComponent
  ]
})
export class PageModule { }
