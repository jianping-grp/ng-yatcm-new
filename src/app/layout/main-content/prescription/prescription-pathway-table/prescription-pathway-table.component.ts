import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-prescription-pathway-table',
  templateUrl: './prescription-pathway-table.component.html',
  styleUrls: ['./prescription-pathway-table.component.css']
})
export class PrescriptionPathwayTableComponent implements OnInit {
  // restUrl$: Observable<string>;
  onlyMapPathwayRestUrl$: Observable<string>;
  enrichPathwayRestUrl$: Observable<string>;
  prescriptionId: number;
  body: object;
  displayedColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'compound_detail', 'protein_detail'];
  allColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'compound_detail', 'protein_detail'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
      // this.restUrl$ = observableOf(`keggpathwaysexclude/prescription_map_kegg_list/?include[]=category.*`);
      this.onlyMapPathwayRestUrl$ = observableOf(`keggpathwaysexclude/prescription_only_map_kegg_list/?include[]=category.*`);
      this.enrichPathwayRestUrl$ = observableOf(
        `PrescriptionEnrichPathway/prescription_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
    });
  }

}
