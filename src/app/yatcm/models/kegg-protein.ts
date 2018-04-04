import {Target} from './target';
import {KeggPathway} from './kegg-pathway';

export interface KeggProtein {
  kegg_id?: string;
  id?: number;
  targets?: Target[];
  pathways?: KeggPathway[];
}
