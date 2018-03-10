import {Assay} from './assay';
import {Chembl} from './chembl';
import {Activity} from './activity';

export interface Doc {
  journal?: string;
  year?: number;
  volumn?: string;
  first_page?: string;
  authors?: string;
  id?: number;
  doc_type?: string;
  doi?: string;
  title?: string;
  issue: string;
  chembl_id?: string;
  patent_id?: string;
  last_page?: string;
  pubmed_id?: number;
  doc_id?: number;
  abstract?: string;
  assays_set?: Assay[];
  chembl_set?: Chembl[];
  activities_set?: Activity[];
}
