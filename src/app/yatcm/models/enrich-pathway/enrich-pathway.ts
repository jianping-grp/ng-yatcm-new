import {Herb} from '../herb';
import {KeggPathway} from '../kegg-pathway';
import {Prescription} from '../prescription';
import {Compound} from '../compound';
import {Target} from '../target';
import {TtdDisease} from '../ttd-disease';

export interface EnrichPathway {
  id?: number;
  count?: number;
  p_value?: number;
  gene_ratio?: string;
  q_value?: string;
  p_adjust?: string;
  bg_ratio?: string;
  gene_id?: string;
  pathway?: number;
  links?: {
    herb?: Herb[];
    pathway?: KeggPathway[];
    prescription?: Prescription[];
    compount?: Compound[];
    target?: Target[];
    ttddisease?: TtdDisease[];
  };
}
