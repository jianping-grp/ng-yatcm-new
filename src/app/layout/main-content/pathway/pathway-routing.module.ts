import {RouterModule, Routes} from '@angular/router';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {NgModule} from '@angular/core';
import {PathwayCompoundDetailComponent} from './pathway-compound-detail/pathway-compound-detail.component';
import {KeggMapComponent} from './kegg-map/kegg-map.component';
import {PathwayProteinDetailComponent} from './pathway-protein-detail/pathway-protein-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PathwayListComponent,
  },
  {
    path: 'kegg-map',
    component: KeggMapComponent,
  },
  {
    path: 'compound-detail',
    component: PathwayCompoundDetailComponent,
  },
  {
    path: 'protein-detail',
    component: PathwayProteinDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathwayRoutingModule { }
