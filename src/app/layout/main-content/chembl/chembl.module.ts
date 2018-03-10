import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ContainerModule} from '../../container/container.module';
import {ChemblRoutingModule} from './chembl-routing.module';
import {ChemblDetailComponent} from './chembl-detail/chembl-detail.component';
import {CardModule} from '../../../shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContainerModule,
    CardModule,
    ChemblRoutingModule,
  ],
  declarations: [
    ChemblDetailComponent
  ]
})
export class ChemblModule { }
