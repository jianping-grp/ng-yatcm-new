import {Chembl} from './chembl';
import {Assay} from './assay';

export interface Chemblrelatedtarget {
  id?: number;
  tid?: number;
  chembl_id?: string;
  pref_name?: string;
  tax_id?: number;
  chembl_set?: Chembl[];
  assays_set?: Assay[];
}
