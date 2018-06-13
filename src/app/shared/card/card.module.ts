import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {DocCardComponent} from './doc-card/doc-card.component';
import {AssayCardComponent} from './assay-card/assay-card.component';
import {ChemblRelatedTargetCardComponent} from './chembl-related-target-card/chembl-related-target-card.component';
import {NgModule} from '@angular/core';
import {
  YatcmSimilarityKeggCompoundCardComponent
} from './yatcm-similarity-kegg-compound-card/yatcm-similarity-kegg-compound-card.component';
import {KeggproteinToTargetComponent} from './keggprotein-to-target/keggprotein-to-target.component';
import {CompoundCardComponent} from './compound-card/compound-card.component';
import { SelectTargetOrPathwayListComponent } from './select-target-or-pathway-list/select-target-or-pathway-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    DocCardComponent,
    AssayCardComponent,
    ChemblRelatedTargetCardComponent,
    YatcmSimilarityKeggCompoundCardComponent,
    KeggproteinToTargetComponent,
    CompoundCardComponent,
    SelectTargetOrPathwayListComponent
  ],
  exports: [
    DocCardComponent,
    AssayCardComponent,
    ChemblRelatedTargetCardComponent,
    YatcmSimilarityKeggCompoundCardComponent,
    KeggproteinToTargetComponent,
    CompoundCardComponent,
    SelectTargetOrPathwayListComponent
  ],
  entryComponents: [
    DocCardComponent,
    AssayCardComponent,
    ChemblRelatedTargetCardComponent,
    YatcmSimilarityKeggCompoundCardComponent,
    KeggproteinToTargetComponent,
    CompoundCardComponent,
    SelectTargetOrPathwayListComponent
  ]
})

export class CardModule { }
