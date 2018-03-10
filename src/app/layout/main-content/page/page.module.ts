import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {ContactComponent} from './contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
  ],
  exports: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
  ]
})
export class PageModule { }
