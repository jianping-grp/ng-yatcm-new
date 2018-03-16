import {RouterModule, Routes} from '@angular/router';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {NgModule} from '@angular/core';
import {PathwayDetailComponent} from './pathway-detail/pathway-detail.component';
import {KeggMapComponent} from './kegg-map/kegg-map.component';
import {KeggMapCanvasComponent} from "./kegg-map-canvas/kegg-map-canvas.component";

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
    path: 'kegg-map-canvas',
    component: KeggMapCanvasComponent
  },
  {
    path: ':id',
    component: PathwayDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathwayRoutingModule { }
