import {Compound} from './compound';
import {Herb} from './herb';

export interface MainPrescription {
  chinese_indiction?: string;
  fangjie?: string;
  herbs?: Herb[];
  main_prescription?: MainPrescription[]; // todo modify
  compounds?: Compound[];
  yongfa?: string;
  chinese_name?: string;
  pinyin_name?: string;
  english_modern_application?: string;
  english_name?: string;
  id?: number;
  zucheng?: string;
  english_indiction?: string;
  chinese_modern_application?: string;
}

