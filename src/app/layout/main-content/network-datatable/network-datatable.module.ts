import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkDatatableRoutingModule} from './network-datatable-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ContainerModule} from '../../container/container.module';
import {HerbHerbNetworkDataListComponent} from './herb-herb-network-data-list/herb-herb-network-data-list.component';

@NgModule({
  imports: [
    CommonModule,
    NetworkDatatableRoutingModule,
    SharedModule,
    ContainerModule
  ],
  declarations: [
    HerbHerbNetworkDataListComponent
  ]
})
export class NetworkDatatableModule { }
