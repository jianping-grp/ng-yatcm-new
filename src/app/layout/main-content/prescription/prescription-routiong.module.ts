import {RouterModule, Routes} from '@angular/router';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {NgModule} from '@angular/core';
import {PrescriptionDetailComponent} from "./prescription-detail/prescription-detail.component";

const routes: Routes = [
  {
    path: '',
    component: PrescriptionListComponent,
  },
  {
    path: ':id',
    component: PrescriptionDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutiongModule { }
