import {Link} from './link';
import {Node} from './node';

export interface Network {
  nodes?: Node[];
  links?: Link[];
}
