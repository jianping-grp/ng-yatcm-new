import {RouterModule, Routes} from '@angular/router';
import {HerbListComponent} from './herb-list/herb-list.component';
import {NgModule} from '@angular/core';
import {HerbDetailComponent} from './herb-detail/herb-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HerbListComponent,
  },
  {
    path: ':id',
    component: HerbDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerbRoutingModule { }
