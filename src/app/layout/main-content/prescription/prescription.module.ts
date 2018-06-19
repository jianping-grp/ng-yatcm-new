import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {PrescriptionRoutingModule} from './prescription-routing.module';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionDetailComponent} from './prescription-detail/prescription-detail.component';
import {ContainerModule} from '../../container/container.module';
import {PrescriptionHerbTableComponent} from './prescription-herb-table/prescription-herb-table.component';
import {PrescriptionNetworkComponent} from './prescription-network/prescription-network.component';
import {PrescriptionCompoundTableComponent} from './prescription-compound-table/prescription-compound-table.component';
import {PrescriptionTargetTableComponent} from './prescription-target-table/prescription-target-table.component';
import {PrescriptionPathwayTableComponent} from './prescription-pathway-table/prescription-pathway-table.component';
import {PrescriptionDiseaseTableComponent} from './prescription-disease-table/prescription-disease-table.component';
import {PrescriptionNetworkGraphComponent} from './prescription-network-graph/prescription-network-graph.component';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    PrescriptionRoutingModule
  ],
  declarations: [
    PrescriptionListComponent,
    PrescriptionDetailComponent,
    PrescriptionNetworkComponent,
    PrescriptionHerbTableComponent,
    PrescriptionCompoundTableComponent,
    PrescriptionTargetTableComponent,
    PrescriptionPathwayTableComponent,
    PrescriptionDiseaseTableComponent,
    PrescriptionNetworkGraphComponent
  ]
})
export class PrescriptionModule { }
