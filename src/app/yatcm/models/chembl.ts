import {TargetChemblId} from './target-chembl-id';
import {Compound} from './compound';
import {AssayChemblId} from './assay-chembl-id';
import {DocChemblId} from './doc-chembl-id';
import {Activity} from './activity';
import {Assay} from './assay';
import {Doc} from './doc';
import {Chemblrelatedtarget} from './chemblrelatedtarget';

export interface Chembl {
  max_phase?: string;
  target_chembl_ids?: TargetChemblId[];
  compoud_set?: Compound;
  assay_chembl_ids?: AssayChemblId[];
  doc_chembl_ids?: DocChemblId[];
  canonical_smi?: string;
  url?: string;
  chembl_id?: string;
  pref_name?: string;
  id?: number;
  prodrug?: string;
  same_or_similar?: string;
  oral?: string;
  tanimoto?: number;
  activities?: Activity[];
  assays?: Assay[];
  docs?: Doc[];
  chemblrelatedtargets?: Chemblrelatedtarget[];
}
