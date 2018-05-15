import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DiseaseDetailComponent} from './disease-detail/disease-detail.component';
import {DiseaseListComponent} from './disease-list/disease-list.component';
import {DiseasePrescriptionTableComponent} from './disease-prescription-table/disease-prescription-table.component';
import {DiseaseHerbTableComponent} from './disease-herb-table/disease-herb-table.component';
import {DiseaseCompoundTableComponent} from './disease-compound-table/disease-compound-table.component';
import {DiseaseTargetTableComponent} from './disease-target-table/disease-target-table.component';
import {DiseasePathwayTableComponent} from './disease-pathway-table/disease-pathway-table.component';
import {DiseaseNetworkComponent} from './disease-network/disease-network.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseListComponent
  },
  {
    path: ':id',
    component: DiseaseDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'disease-prescription',
        pathMatch: 'full'
      },
      {
        path: 'disease-prescription',
        component: DiseasePrescriptionTableComponent
      },
      {
        path: 'disease-herb',
        component: DiseaseHerbTableComponent
      },
      {
        path: 'disease-compound',
        component: DiseaseCompoundTableComponent
      },
      {
        path: 'disease-target',
        component: DiseaseTargetTableComponent
      },
      {
        path: 'disease-pathway',
        component: DiseasePathwayTableComponent
      },
      {
        path: 'disease-network',
        component: DiseaseNetworkComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }
