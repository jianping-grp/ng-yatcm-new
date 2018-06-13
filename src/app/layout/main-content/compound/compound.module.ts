import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CompoundRoutingModule} from './compound-routing.module';
import {CompoundListComponent} from './compound-list/compound-list.component';
import {CompoundDetailComponent} from './compound-detail/compound-detail.component';
import {ContainerModule} from '../../container/container.module';
import {CompoundPathwayTableComponent} from './compound-pathway-table/compound-pathway-table.component';
import {CompoundTargetTableComponent} from './compound-target-table/compound-target-table.component';
import {CompoundSeaTargetComponent} from './compound-sea-target/compound-sea-target.component';
import {CompoundDiseaseTableComponent} from './compound-disease-table/compound-disease-table.component';
import {RelateChemblMoleculeComponent} from './relate-chembl-molecule/relate-chembl-molecule.component';
import {CompoundPrescriptionTableComponent} from './compound-prescription-table/compound-prescription-table.component';
import {CompoundHerbTableComponent} from './compound-herb-table/compound-herb-table.component';
import {CompoundNetworkComponent} from './compound-network/compound-network.component';
import {CompoundStructureSearchComponent} from './compound-structure-search/compound-structure-search.component';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    CompoundRoutingModule
  ],
  declarations: [
    CompoundListComponent,
    CompoundDetailComponent,
    CompoundNetworkComponent,
    CompoundPrescriptionTableComponent,
    CompoundHerbTableComponent,
    CompoundPathwayTableComponent,
    CompoundTargetTableComponent,
    CompoundSeaTargetComponent,
    CompoundDiseaseTableComponent,
    RelateChemblMoleculeComponent,
    CompoundStructureSearchComponent
  ]
})
export class CompoundModule { }
