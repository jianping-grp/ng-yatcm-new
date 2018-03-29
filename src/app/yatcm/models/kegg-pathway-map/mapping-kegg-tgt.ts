export interface MappingKeggTgt {
  herb_id?: number;
  type?: string;
  kegg_pathway_id?: string | number;
  coords?: { x?: string, y?: string, width?: string, height?: string } | string;
  keggprotein_keggid?: string;
  prescription_id?: number | string;
  cpd_id?: number;
}
