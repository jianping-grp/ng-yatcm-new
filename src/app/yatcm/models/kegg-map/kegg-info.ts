import {MappingKeggCpds} from './mapping-kegg-cpds';

export interface KeggInfo {
  kegg_info?: {
    mapping_kegg_cpds?: MappingKeggCpds[],
    cpd_id?: number
  };
}
