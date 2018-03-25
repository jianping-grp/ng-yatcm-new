import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {PathwayRoutingModule} from './pathway-routing.module';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {PathwayDetailComponent} from './pathway-detail/pathway-detail.component';
import {ContainerModule} from '../../container/container.module';
import {KeggMapComponent} from './kegg-map/kegg-map.component';
import {CardModule} from '../../../shared/card/card.module';


@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    CardModule,
    PathwayRoutingModule
  ],
  declarations: [
    PathwayListComponent,
    PathwayDetailComponent,
    KeggMapComponent,
  ]
})
export class PathwayModule { }
