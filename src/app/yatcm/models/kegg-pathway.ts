import {KeggPathwayCategory} from './kegg-pathway-category';

export interface KeggPathway {
  kegg_id?: string;
  name?: string;
  kgml?: string;
  image?: string;
  category?: KeggPathwayCategory;
}
