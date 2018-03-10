import {RouterModule, Routes} from '@angular/router';
import {CompoundListComponent} from './compound-list/compound-list.component';
import {NgModule} from '@angular/core';
import {CompoundDetailComponent} from './compound-detail/compound-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CompoundListComponent
  },
  {
    path: ':id',
    component: CompoundDetailComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompoundRoutingModule { }
