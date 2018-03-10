import {RouterModule, Routes} from '@angular/router';
import {TargetListComponent} from './target-list/target-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TargetListComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule { }
