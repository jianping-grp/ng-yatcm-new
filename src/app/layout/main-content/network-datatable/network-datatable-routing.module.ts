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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDatatableRoutingModule { }
