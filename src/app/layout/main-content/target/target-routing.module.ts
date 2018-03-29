import {RouterModule, Routes} from '@angular/router';
import {TargetListComponent} from './target-list/target-list.component';
import {NgModule} from '@angular/core';
import {TargetDetailComponent} from "./target-detail/target-detail.component";
import {TargetCompoundTableComponent} from "./target-compound-table/target-compound-table.component";
import {TargetDiseaseTableComponent} from "./target-disease-table/target-disease-table.component";
import {TargetPathwayTableComponent} from "./target-pathway-table/target-pathway-table.component";
import {TargetHerbTableComponent} from "./target-herb-table/target-herb-table.component";
import {TargetPrescriptionTableComponent} from "./target-prescription-table/target-prescription-table.component";

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
