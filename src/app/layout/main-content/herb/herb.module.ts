import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HerbRoutingModule} from './herb-routing.module';
import {HerbListComponent} from './herb-list/herb-list.component';
import {HerbDetailComponent} from './herb-detail/herb-detail.component';
import {ContainerModule} from '../../container/container.module';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    HerbRoutingModule,
  ],
  declarations: [
    HerbListComponent,
    HerbDetailComponent,
  ],
})
export class HerbModule { }
