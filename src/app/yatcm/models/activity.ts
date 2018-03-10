import {Doc} from './doc';
import {Assay} from './assay';
import {Chembl} from './chembl';

export interface Activity {
  activity_id?: number;
  published_value?: string;
  standard_value?: string;
  standard_type?: string;
  standard_flag?: number;
  published_units?: string;
  pchembl_value?: string;
  standard_relation?: string;
  standard_units?: string;
  id?: number;
  doc?: Doc;
  assay: Assay;
  chembl_set?: Chembl[];
}
