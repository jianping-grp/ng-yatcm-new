import {Target} from './target';

export interface Disease {
  name?: string;
  id?: number;
  clinical_feature?: string;
  description?: string;
  omim_url?: string;
  synonyms?: string;
  target?: Target[];
  tcimd_url?: string;
}
