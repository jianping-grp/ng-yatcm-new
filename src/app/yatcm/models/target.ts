import {Compound} from './compound';
import {Disease} from './disease';
import {KeggProtein} from "./kegg-protein";

export interface Target {
  id?: number;
  chemblid?: string;
  chembl_url: string;
  target_name?: string;
  gene_name?: string;
  uniprot_name?: string;
  uniprot_link?: string;
  tcmid_link?: string;
  related_drugs?: any; // todo
  disease_set?: Disease[];
  compounds?: Compound[];
  keggprotein_set?: KeggProtein[];
}
