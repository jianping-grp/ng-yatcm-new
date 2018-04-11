import {RouterModule, Routes} from '@angular/router';
import {CompoundListComponent} from './compound-list/compound-list.component';
import {NgModule} from '@angular/core';
import {CompoundDetailComponent} from './compound-detail/compound-detail.component';
import {CompoundPrescriptionTableComponent} from './compound-prescription-table/compound-prescription-table.component';
import {CompoundHerbTableComponent} from './compound-herb-table/compound-herb-table.component';
import {CompoundTargetTableComponent} from './compound-target-table/compound-target-table.component';
import {CompoundSeaTargetComponent} from './compound-sea-target/compound-sea-target.component';
import {CompoundPathwayTableComponent} from './compound-pathway-table/compound-pathway-table.component';
import {CompoundDiseaseTableComponent} from './compound-disease-table/compound-disease-table.component';
import {RelateChemblMoleculeComponent} from './relate-chembl-molecule/relate-chembl-molecule.component';
import {CompoundNetworkComponent} from './compound-network/compound-network.component';
import {CompoundStructureSearchComponent} from "./compound-structure-search/compound-structure-search.component";

const routes: Routes = [
  {
    path: '',
    component: CompoundListComponent
  },
  {
   path: 'search',
   component: CompoundStructureSearchComponent
  },
  {
    path: ':id',
    component: CompoundDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'compound-prescription',
        pathMatch: 'full'
      },
      {
        path: 'compound-network',
        component: CompoundNetworkComponent
      },
      {
        path: 'compound-prescription',
        component: CompoundPrescriptionTableComponent
      },
      {
        path: 'compound-herb',
        component: CompoundHerbTableComponent
      },
      {
        path: 'compound-target',
        component: CompoundTargetTableComponent
      },
      {
        path: 'compound-sea',
        component: CompoundSeaTargetComponent
      },
      {
        path: 'compound-pathway',
        component: CompoundPathwayTableComponent
      },
      {
        path: 'compound-disease',
        component: CompoundDiseaseTableComponent
      },
      {
        path: 'relate-molecule',
        component: RelateChemblMoleculeComponent
      }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompoundRoutingModule { }
