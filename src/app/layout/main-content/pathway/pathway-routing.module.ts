import {RouterModule, Routes} from '@angular/router';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {NgModule} from '@angular/core';
import {PathwayDetailComponent} from './pathway-detail/pathway-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PathwayListComponent,
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
