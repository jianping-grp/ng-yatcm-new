import {KeggPathway} from "./kegg-pathway";

export interface KeggCompound {
  kegg_id?: string;
  name?: string;
  mol?: string;
  mol_block?: string;
  smiles?: string;
  mol_image?: string;
  pathway?: KeggPathway;
  similar_to_tcm?: string;
  id?: number;
}
