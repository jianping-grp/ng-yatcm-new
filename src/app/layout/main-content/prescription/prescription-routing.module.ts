import {RouterModule, Routes} from '@angular/router';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {NgModule} from '@angular/core';
import {PrescriptionDetailComponent} from './prescription-detail/prescription-detail.component';
import {PrescriptionHerbTableComponent} from './prescription-herb-table/prescription-herb-table.component';
import {PrescriptionNetworkComponent} from './prescription-network/prescription-network.component';
import {PrescriptionCompoundTableComponent} from './prescription-compound-table/prescription-compound-table.component';
import {PrescriptionTargetTableComponent} from './prescription-target-table/prescription-target-table.component';
import {PrescriptionPathwayTableComponent} from './prescription-pathway-table/prescription-pathway-table.component';
import {PrescriptionDiseaseTableComponent} from './prescription-disease-table/prescription-disease-table.component';
import {SpliceNetworkComponent} from './splice-network/splice-network.component';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionListComponent,
  },
  {
    path: 'network',
    component: SpliceNetworkComponent,
  },
  {
    path: ':id',
    component: PrescriptionDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'prescription-herb',
        pathMatch: 'full'
      },
      {
        path: 'prescription-network',
        component: PrescriptionNetworkComponent,
      },
      {
        path: 'prescription-herb',
        component: PrescriptionHerbTableComponent
      },
      {
        path: 'prescription-compound',
        component: PrescriptionCompoundTableComponent
      },
      {
        path: 'prescription-target',
        component: PrescriptionTargetTableComponent
      },
      {
        path: 'prescription-pathway',
        component: PrescriptionPathwayTableComponent
      },
      {
        path: 'prescription-disease',
        component: PrescriptionDiseaseTableComponent
      },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
