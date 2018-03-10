import {RouterModule, Routes} from '@angular/router';
import {ChemblDetailComponent} from './chembl-detail/chembl-detail.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: ':id',
    component: ChemblDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChemblRoutingModule { }
