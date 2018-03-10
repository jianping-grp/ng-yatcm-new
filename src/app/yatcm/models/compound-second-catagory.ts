import {Compound} from './compound';
import {CompoundFirstCatagory} from './compound-first-catagory';

export interface CompoundSecondCatagory {
  Chinese_second_catagory?: string;
  English_second_catagory?: string;
  catagory_smile?: string;
  compounds?: Compound[];
  first_catagory?: CompoundFirstCatagory;
  id?: number;
}
