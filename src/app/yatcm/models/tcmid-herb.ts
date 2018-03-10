import {Compound} from './compound';

export interface TcmidHerb {
  English_name?: string;
  tcmid_link?: string;
  id?: number;
  compounds?: Compound[];
}
