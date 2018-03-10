import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {PathwayRoutingModule} from './pathway-routing.module';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {PathwayDetailComponent} from './pathway-detail/pathway-detail.component';
import {ContainerModule} from "../../container/container.module";

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    PathwayRoutingModule
  ],
  declarations: [
    PathwayListComponent,
    PathwayDetailComponent
  ]
})
export class PathwayModule { }
