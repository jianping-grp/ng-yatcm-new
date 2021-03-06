import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HerbRoutingModule} from './herb-routing.module';
import {HerbListComponent} from './herb-list/herb-list.component';
import {HerbDetailComponent} from './herb-detail/herb-detail.component';
import {ContainerModule} from '../../container/container.module';
import {HerbNetworkComponent} from './herb-network/herb-network.component';
import {HerbPrescriptionTableComponent} from './herb-prescription-table/herb-prescription-table.component';
import {HerbCompoundTableComponent} from './herb-compound-table/herb-compound-table.component';
import {HerbTargetTableComponent} from './herb-target-table/herb-target-table.component';
import {HerbPathwayTableComponent} from './herb-pathway-table/herb-pathway-table.component';
import {HerbDiseaseTableComponent} from './herb-disease-table/herb-disease-table.component';
import {HerbNetworkGraphComponent} from './herb-network-graph/herb-network-graph.component';
import { HerbEnrichPathwayComponent } from './herb-enrich-pathway/herb-enrich-pathway.component';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    HerbRoutingModule,
  ],
  declarations: [
    HerbListComponent,
    HerbDetailComponent,
    HerbNetworkComponent,
    HerbPrescriptionTableComponent,
    HerbCompoundTableComponent,
    HerbTargetTableComponent,
    HerbPathwayTableComponent,
    HerbDiseaseTableComponent,
    HerbNetworkGraphComponent,
    HerbEnrichPathwayComponent
  ],
})
export class HerbModule { }
