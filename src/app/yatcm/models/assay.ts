import {Chembl} from './chembl';
import {Chemblrelatedtarget} from './chemblrelatedtarget';
import {Doc} from './doc';

export interface Assay {
  id?: number;
  chemblid?: string;
  assay_id?: number;
  description?: string;
  chembl_set?: Chembl[];
  tid?: Chemblrelatedtarget[];
  doc?: Doc[];
}
