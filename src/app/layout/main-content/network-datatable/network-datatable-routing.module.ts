import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HerbHerbSharedTargetNetworkDataListComponent
} from './herb-herb-shared-target-network-data-list/herb-herb-shared-target-network-data-list.component';
import {
  HerbHerbSharedDiseaseNetworkDataListComponent
} from './herb-herb-shared-disease-network-data-list/herb-herb-shared-disease-network-data-list.component';
import {
  HerbHerbNetworkSharedPathwayListComponent
} from './herb-herb-network-shared-pathway-list/herb-herb-network-shared-pathway-list.component';
import {PherbPherbSharedTargetListComponent} from './pherb-pherb-shared-target-list/pherb-pherb-shared-target-list.component';
import {PherbPherbSharedDiseaseListComponent} from './pherb-pherb-shared-disease-list/pherb-pherb-shared-disease-list.component';

const routes: Routes = [
  {
    path: 'herb-herb-shared-target',
    component: HerbHerbSharedTargetNetworkDataListComponent
  },
  {
    path: 'herb-herb-shared-disease',
    component: HerbHerbSharedDiseaseNetworkDataListComponent
  },
  {
    path: 'pathway-list',
    component: HerbHerbNetworkSharedPathwayListComponent
  },
  {
    path: 'target-list',
    component: PherbPherbSharedTargetListComponent
  },
  {
    path: 'disease-list',
    component: PherbPherbSharedDiseaseListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDatatableRoutingModule { }
