import {Target} from './target';

export interface TtdDisease {
  ICD9?: string;
  ICD10?: string;
  id?: number;
  name?: string;
  targets?: Target[];
}
