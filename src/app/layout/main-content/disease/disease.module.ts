import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ContainerModule} from '../../container/container.module';
import {DiseaseDetailComponent} from './disease-detail/disease-detail.component';
import {DiseaseListComponent} from './disease-list/disease-list.component';
import {DiseaseRoutingModule} from './disease-routing.module';
import {DiseaseTargetTableComponent} from './disease-target-table/disease-target-table.component';
import {DiseaseCompoundTableComponent} from './disease-compound-table/disease-compound-table.component';
import {DiseaseHerbTableComponent} from './disease-herb-table/disease-herb-table.component';
import {DiseasePrescriptionTableComponent} from './disease-prescription-table/disease-prescription-table.component';
import {DiseasePathwayTableCompoent} from './disease-pathway-table/disease-pathway-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContainerModule,
    DiseaseRoutingModule
  ],
  declarations: [
    DiseaseListComponent,
    DiseaseDetailComponent,
    DiseaseTargetTableComponent,
    DiseaseCompoundTableComponent,
    DiseaseHerbTableComponent,
    DiseasePrescriptionTableComponent,
    DiseasePathwayTableCompoent
  ]
})
export class DiseaseModule {}
