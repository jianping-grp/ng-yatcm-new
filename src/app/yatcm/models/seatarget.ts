import {Compound} from './compound';

export interface Seatarget {
  chembl_id?: string;
  id?: number;
  compound?: Compound[];
  name?: string;
  tid?: number,
  species_group_flag?: number,
  organism?: string,
  tax_id?: number,
  target_type?: string
}
