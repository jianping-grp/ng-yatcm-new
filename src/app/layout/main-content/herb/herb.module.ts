import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HerbRoutingModule} from './herb-routing.module';
import {HerbListComponent} from './herb-list/herb-list.component';
import {HerbDetailComponent} from './herb-detail/herb-detail.component';
import {ContainerModule} from '../../container/container.module';
import {HerbNetworkDataComponent} from "./herb-network-data/herb-network-data.component";
import {HerbPrescriptionTableComponent} from "./herb-prescription-table/herb-prescription-table.component";
import {HerbCompoundTableComponent} from "./herb-compound-table/herb-compound-table.component";
import {HerbTargetTableComponent} from "./herb-target-table/herb-target-table.component";
import {HerbPathwayTableComponent} from "./herb-pathway-table/herb-pathway-table.component";
import {HerbDiseaseTableComponent} from "./herb-disease-table/herb-disease-table.component";

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    HerbRoutingModule,
  ],
  declarations: [
    HerbListComponent,
    HerbDetailComponent,
    HerbNetworkDataComponent,
    HerbPrescriptionTableComponent,
    HerbCompoundTableComponent,
    HerbTargetTableComponent,
    HerbPathwayTableComponent,
    HerbDiseaseTableComponent,
  ],
})
export class HerbModule { }
