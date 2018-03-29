import {Herb} from './herb';
import {Compound} from './compound';

export interface Prescription {
  chinese_indiction?: string;
  fangjie?: string;
  herbs?: Herb[];
  main_prescription?: any; // todo modify
  compounds?: Compound[];
  yongfa?: string;
  reference?: string;
  chinese_name?: string;
  pinyin_name?: string;
  english_modern_application?: string;
  english_name?: string;
  id?: number;
  zucheng?: string;
  english_indiction?: string;
  chinese_modern_application?: string;
}
