import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CompoundTableComponent} from './compound-table/compound.table.component';
import {HerbTableComponent} from './herb-table/herb-table.component';
import {PrescriptionTableComponent} from './prescription-table/prescription-table.component';
import {PathwayTableComponent} from './pathway-table/pathway-table.component';
import {TargetTableComponent} from './target-table/target-table.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  ],
  declarations: [
    CompoundTableComponent,
    HerbTableComponent,
    PrescriptionTableComponent,
    PathwayTableComponent,
    TargetTableComponent
  ],
  exports: [
    CompoundTableComponent,
    HerbTableComponent,
    PrescriptionTableComponent,
    PathwayTableComponent,
    TargetTableComponent
  ]
})
export class ContainerModule { }
