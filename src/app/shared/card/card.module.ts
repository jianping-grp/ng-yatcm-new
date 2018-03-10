import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {DocCardComponent} from './doc-card/doc-card.component';
import {AssayCardComponent} from './assay-card/assay-card.component';
import {ChemblRelatedTargetCardComponent} from './chembl-related-target-card/chembl-related-target-card.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    DocCardComponent,
    AssayCardComponent,
    ChemblRelatedTargetCardComponent,
  ],
  exports: [
    DocCardComponent,
    AssayCardComponent,
    ChemblRelatedTargetCardComponent,
  ],
  entryComponents: [
    DocCardComponent,
    AssayCardComponent,
    ChemblRelatedTargetCardComponent,
  ]
})

export class CardModule { }
