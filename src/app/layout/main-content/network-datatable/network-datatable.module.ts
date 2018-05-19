import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkDatatableRoutingModule} from './network-datatable-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ContainerModule} from '../../container/container.module';
import {
  HerbHerbSharedTargetNetworkDataListComponent
} from './herb-herb-shared-target-network-data-list/herb-herb-shared-target-network-data-list.component';
import {
  HerbHerbSharedDiseaseNetworkDataListComponent
} from './herb-herb-shared-disease-network-data-list/herb-herb-shared-disease-network-data-list.component';

@NgModule({
  imports: [
    CommonModule,
    NetworkDatatableRoutingModule,
    SharedModule,
    ContainerModule
  ],
  declarations: [
    HerbHerbSharedTargetNetworkDataListComponent,
    HerbHerbSharedDiseaseNetworkDataListComponent
  ]
})
export class NetworkDatatableModule { }
