import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ContainerModule} from '../../container/container.module';
import {TargetRoutingModule} from './target-routing.module';
import {TargetListComponent} from './target-list/target-list.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetCompoundTableComponent} from './target-compound-table/target-compound-table.component';
import {TargetPathwayTableComponent} from './target-pathway-table/target-pathway-table.component';
import {TargetDiseaseTableComponent} from './target-disease-table/target-disease-table.component';
import {TargetHerbTableComponent} from './target-herb-table/target-herb-table.component';
import {TargetPrescriptionTableComponent} from './target-prescription-table/target-prescription-table.component';
import {TargetNetworkComponent} from './target-network/target-network.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContainerModule,
    TargetRoutingModule
  ],
  declarations: [
    TargetListComponent,
    TargetDetailComponent,
    TargetCompoundTableComponent,
    TargetPathwayTableComponent,
    TargetDiseaseTableComponent,
    TargetHerbTableComponent,
    TargetPrescriptionTableComponent,
    TargetNetworkComponent
  ]
})
export class TargetModule { }
