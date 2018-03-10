import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {PageModule} from './layout/main-content/page/page.module';
import {AppRoutingModule} from './app-routing.module';
import {SearchComponent} from './layout/main-content/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
