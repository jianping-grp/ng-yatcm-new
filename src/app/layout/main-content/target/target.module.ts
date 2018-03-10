import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ContainerModule} from '../../container/container.module';
import {TargetRoutingModule} from './target.-routing.module';
import {TargetListComponent} from './target-list/target-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContainerModule,
    TargetRoutingModule
  ],
  declarations: [
    TargetListComponent
  ]
})
export class TargetModule { }
