import {Compound} from './compound';
import {KeggCompound} from './kegg-compound';

export interface KeggSimilarity {
  id?: number;
  tcm?: Compound;
  kegg_compound?: KeggCompound;
  similarity?: string;
}
