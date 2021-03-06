import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/main-content/page/home/home.component';
import {HelpComponent} from './layout/main-content/page/help/help.component';
import {ContactComponent} from './layout/main-content/page/contact/contact.component';
import {SearchComponent} from './layout/main-content/page/search/search.component';
import {NgModule} from '@angular/core';
import {SeaComponent} from "./layout/main-content/page/sea/sea.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'sea',
    component: SeaComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'herb',
    loadChildren: 'app/layout/main-content/herb/herb.module#HerbModule'
  },
  {
    path: 'prescription',
    loadChildren: 'app/layout/main-content/prescription/prescription.module#PrescriptionModule'
  },
  {
    path: 'pathway',
    loadChildren: 'app/layout/main-content/pathway/pathway.module#PathwayModule'
  },
  {
    path: 'compound',
    loadChildren: 'app/layout/main-content/compound/compound.module#CompoundModule'
  },
  {
    path: 'target',
    loadChildren: 'app/layout/main-content/target/target.module#TargetModule'
  },
  {
    path: 'chembl-compound',
    loadChildren: 'app/layout/main-content/chembl/chembl.module#ChemblModule'
  },
  {
    path: 'network-datatable',
    loadChildren: 'app/layout/main-content/network-datatable/network-datatable.module#NetworkDatatableModule'
  },
  {
    path: 'disease',
    loadChildren: 'app/layout/main-content/disease/disease.module#DiseaseModule'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)], // todo delete
  exports: [RouterModule]
})
export class AppRoutingModule { }
