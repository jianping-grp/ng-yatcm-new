import {RouterModule, Routes} from '@angular/router';
import {HerbListComponent} from './herb-list/herb-list.component';
import {NgModule} from '@angular/core';
import {HerbDetailComponent} from './herb-detail/herb-detail.component';
import {HerbNetworkDataComponent} from "./herb-network-data/herb-network-data.component";
import {HerbPrescriptionTableComponent} from "./herb-prescription-table/herb-prescription-table.component";
import {HerbCompoundTableComponent} from "./herb-compound-table/herb-compound-table.component";
import {HerbTargetTableComponent} from "./herb-target-table/herb-target-table.component";
import {HerbPathwayTableComponent} from "./herb-pathway-table/herb-pathway-table.component";
import {HerbDiseaseTableComponent} from "./herb-disease-table/herb-disease-table.component";

const routes: Routes = [
  {
    path: '',
    component: HerbListComponent,
  },
  {
    path: ':id',
    component: HerbDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'herb-network',
        pathMatch: 'full',
      },
      {
        path: 'herb-prescription',
        component: HerbPrescriptionTableComponent
      },
      {
        path: 'herb-compound',
        component: HerbCompoundTableComponent
      },
      {
        path: 'herb-target',
        component: HerbTargetTableComponent
      },
      {
        path: 'herb-pathway',
        component: HerbPathwayTableComponent
      },
      {
        path: 'herb-disease',
        component: HerbDiseaseTableComponent
      },
      {
        path: 'herb-network',
        component: HerbNetworkDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerbRoutingModule { }
