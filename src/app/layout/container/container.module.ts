import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CompoundTableComponent} from './compound-table/compound.table.component';
import {HerbTableComponent} from './herb-table/herb-table.component';
import {PrescriptionTableComponent} from './prescription-table/prescription-table.component';
import {PathwayTableComponent} from './pathway-table/pathway-table.component';
import {TargetTableComponent} from './target-table/target-table.component';
import {CommonModule} from '@angular/common';
import {NetworkTableComponent} from './network-table/network-table.component';
import {DiseaseTableComponent} from './disease-table/disease-table.component';
import {CardModule} from '../../shared/card/card.module';
import {HerbHerbNetworkTableComponent} from './herb-herb-network-table/herb-herb-network-table.component';
import { HerbHerbNetworkGraphComponent } from './herb-herb-network-graph/herb-herb-network-graph.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CardModule
  ],
  declarations: [
    CompoundTableComponent,
    HerbTableComponent,
    PrescriptionTableComponent,
    PathwayTableComponent,
    TargetTableComponent,
    NetworkTableComponent,
    DiseaseTableComponent,
    HerbHerbNetworkTableComponent,
    HerbHerbNetworkGraphComponent
  ],
  exports: [
    CompoundTableComponent,
    HerbTableComponent,
    PrescriptionTableComponent,
    PathwayTableComponent,
    TargetTableComponent,
    NetworkTableComponent,
    DiseaseTableComponent,
    HerbHerbNetworkTableComponent,
    HerbHerbNetworkGraphComponent
  ]
})
export class ContainerModule { }
