import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {PrescriptionRoutiongModule} from './prescription-routiong.module';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionDetailComponent} from './prescription-detail/prescription-detail.component';
import {ContainerModule} from "../../container/container.module";

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    PrescriptionRoutiongModule
  ],
  declarations: [
    PrescriptionListComponent,
    PrescriptionDetailComponent
  ]
})
export class PrescriptionModule { }
