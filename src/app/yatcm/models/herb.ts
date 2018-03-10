import {Compound} from "./compound";
import {Subherb} from "./subherb";
import {Prescription} from "./prescription";

export interface Herb {
  related_id?: number;
  wiki_english?: string;
  wiki_chinese?: string;
  Chinese_name?: string;
  image?: string;
  first_catagory_chinese?: string;
  pinyin_name?: string;
  effect?: string;
  second_catagory_chinese?: string;
  sub_herb_link_id?: string;
  first_catagory_english?: string;
  Chinese_synonyms?: string;
  id?: number;
  second_catagory_english?: string;
  use_part?: string;
  meridians?: string;
  latin_name?: string;
  drug_property?: string;
  indication?: string;
  English_name?: string;
  related_herbs?: any; // todo modify
  subherb_set?: Subherb[];
  texonomy?: any; // todo
  compounds?: Compound[];
  prescription_set: Prescription[];
}
