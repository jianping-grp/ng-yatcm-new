import {RouterModule, Routes} from '@angular/router';
import {TargetListComponent} from './target-list/target-list.component';
import {NgModule} from '@angular/core';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetCompoundTableComponent} from './target-compound-table/target-compound-table.component';
import {TargetDiseaseTableComponent} from './target-disease-table/target-disease-table.component';
import {TargetPathwayTableComponent} from './target-pathway-table/target-pathway-table.component';
import {TargetHerbTableComponent} from './target-herb-table/target-herb-table.component';
import {TargetPrescriptionTableComponent} from './target-prescription-table/target-prescription-table.component';
import {TargetNetworkComponent} from './target-network/target-network.component';
import {TargetEnrichPathwayComponent} from "./target-enrich-pathway/target-enrich-pathway.component";

const routes: Routes = [
  {
    path: '',
    component: TargetListComponent
  },
  {
    path: ':id',
    component: TargetDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'target-prescription',
        pathMatch: 'full'
      },
      {
        path: 'target-network',
        component: TargetNetworkComponent
      },
      {
        path: 'target-compound',
        component: TargetCompoundTableComponent
      },
      {
        path: 'target-disease',
        component: TargetDiseaseTableComponent
      },
      {
        path: 'target-pathway',
        component: TargetPathwayTableComponent
      },
      {
        path: 'target-enrich-pathway',
        component: TargetEnrichPathwayComponent
      },
      {
        path: 'target-herb',
        component: TargetHerbTableComponent
      },
      {
        path: 'target-prescription',
        component: TargetPrescriptionTableComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule { }
