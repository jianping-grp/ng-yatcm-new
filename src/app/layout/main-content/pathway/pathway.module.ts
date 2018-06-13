import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {PathwayRoutingModule} from './pathway-routing.module';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {PathwayCompoundDetailComponent} from './pathway-compound-detail/pathway-compound-detail.component';
import {ContainerModule} from '../../container/container.module';
import {KeggMapComponent} from './kegg-map/kegg-map.component';
import {CardModule} from '../../../shared/card/card.module';
import {PathwayProteinDetailComponent} from './pathway-protein-detail/pathway-protein-detail.component';


@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    CardModule,
    PathwayRoutingModule
  ],
  declarations: [
    PathwayListComponent,
    PathwayCompoundDetailComponent,
    KeggMapComponent,
    PathwayProteinDetailComponent
  ]
})
export class PathwayModule { }
