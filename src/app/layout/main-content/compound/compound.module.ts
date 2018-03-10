import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CompoundRoutingModule} from './compound-routing.module';
import {CompoundListComponent} from './compound-list/compound-list.component';
import {CompoundDetailComponent} from './compound-detail/compound-detail.component';
import {ContainerModule} from "../../container/container.module";

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    CompoundRoutingModule
  ],
  declarations: [
    CompoundListComponent,
    CompoundDetailComponent
  ]
})
export class CompoundModule { }
