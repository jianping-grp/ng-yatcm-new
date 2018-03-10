import {CommonModule} from '@angular/common';
import {ChemblIdActivityIdToTargetChemblIdPipe} from './chembl-id-activity-id-to-target-chembl-id.pipe';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChemblIdActivityIdToTargetChemblIdPipe
  ],
  exports: [ChemblIdActivityIdToTargetChemblIdPipe]
})
export class PipesModule { }
