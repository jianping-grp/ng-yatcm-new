import {Compound} from './compound';

export interface Seatarget {
  chembl_id?: string;
  id?: number;
  compound?: Compound[];
  name?: string;
}
