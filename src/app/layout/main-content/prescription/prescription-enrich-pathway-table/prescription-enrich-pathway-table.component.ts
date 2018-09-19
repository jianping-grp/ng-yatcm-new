import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-prescription-enrich-pathway-table',
  templateUrl: './prescription-enrich-pathway-table.component.html',
  styleUrls: ['./prescription-enrich-pathway-table.component.css']
})
export class PrescriptionEnrichPathwayTableComponent implements OnInit {
  prescriptionId: number;
  restUrl$: Observable<string>;
  body: object;
  displayedColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'compound_detail', 'protein_detail'];
  allColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'compound_detail', 'protein_detail'];

  constructor(private route: ActivatedRoute,
              private rest: RestService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
       this.prescriptionId = +params.get('id');
       this.body = {prescription_id: this.prescriptionId};
       this.restUrl$ = observableOf(
         `PrescriptionEnrichPathway/prescription_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
    });
  }

}
