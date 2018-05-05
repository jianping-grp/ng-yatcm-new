import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HerbHerbNetworkDataListComponent} from './herb-herb-network-data-list/herb-herb-network-data-list.component';

const routes: Routes = [
  {
    path: 'herb-herb-network-data',
    component: HerbHerbNetworkDataListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDatatableRoutingModule { }
