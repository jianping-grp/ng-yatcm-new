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
import {HerbHerbSharedTargetNetworkDataTableComponent} from './herb-herb-shared-target-network-date-table/herb-herb-shared-target-network-data-table.component';
import { HerbHerbSharedTargetNetworkGraphComponent } from './herb-herb-shared-target-network-graph/herb-herb-shared-target-network-graph.component';
import { HerbHerbSharedDiseaseNetworkGraphComponent } from './herb-herb-shared-disease-network-graph/herb-herb-shared-disease-network-graph.component';
import { HerbHerbSharedDiseaseNetworkDataTableComponent } from './herb-herb-shared-disease-network-data-table/herb-herb-shared-disease-network-data-table.component';
import { EnrichPathwayTableComponent } from './enrich-pathway-table/enrich-pathway-table.component';
import { MapPathwayTableComponent } from './map-pathway-table/map-pathway-table.component';
import { CyNetworkTableComponent } from './cy-network-table/cy-network-table.component';

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
    HerbHerbSharedTargetNetworkDataTableComponent,
    HerbHerbSharedTargetNetworkGraphComponent,
    HerbHerbSharedDiseaseNetworkGraphComponent,
    HerbHerbSharedDiseaseNetworkDataTableComponent,
    EnrichPathwayTableComponent,
    MapPathwayTableComponent,
    CyNetworkTableComponent,

  ],
  exports: [
    CompoundTableComponent,
    HerbTableComponent,
    PrescriptionTableComponent,
    PathwayTableComponent,
    TargetTableComponent,
    NetworkTableComponent,
    DiseaseTableComponent,
    HerbHerbSharedTargetNetworkDataTableComponent,
    HerbHerbSharedTargetNetworkGraphComponent,
    HerbHerbSharedDiseaseNetworkGraphComponent,
    HerbHerbSharedDiseaseNetworkDataTableComponent,
    EnrichPathwayTableComponent,
    CyNetworkTableComponent
  ]
})
export class ContainerModule { }
