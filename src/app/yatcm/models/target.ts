import {Compound} from './compound';
import {Disease} from './disease';
import {KeggProtein} from './kegg-protein';

export interface Target {
  id?: number;
  chemblid?: string;
  chembl_url: string;
  target_name?: string;
  gene_name?: string;
  uniprot_name?: string;
  uniprot_link?: string;
  tcmid_link?: string;
  TTD_target_id?: string;
  TTD_target_name?: string;
  TTD_target_type?: string;
  related_drugs?: any;
  disease_set?: Disease[];
  compounds?: Compound[];
  keggprotein_set?: KeggProtein[];
}
