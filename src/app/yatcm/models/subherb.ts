import {Herb} from "./herb";
import {Compound} from "./compound";

export interface Subherb {
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
  first_catagory_ebglish?: string;
  // Chinese_synonyms?: string;
  id?: number;
  second_catagory_english?: string;
  use_part?: string;
  meridians?: string;
  latin_name?: string;
  drug_property?: string;
  indication?: string;
  English_name?: string;
  // related_herb?: any;
  herb?: Herb;
  texonomy?: any; // todo
  // compound?: Compound[];
}
