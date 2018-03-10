import {Compound} from './compound';
import {Diseases} from './diseases';

export interface Target {
  target_name?: string;
  gene_name?: string;
  uniprot_name?: string;
  uniprot_link?: string;
  tcmid_link?: string;
  related_drugs?: any; // todo
  related_diseases?: Diseases[];
  compounds?: Compound[];
}
