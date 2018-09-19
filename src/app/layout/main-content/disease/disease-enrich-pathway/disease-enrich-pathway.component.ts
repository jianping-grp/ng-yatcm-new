import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';
@Component({
  selector: 'app-disease-enrich-pathway',
  templateUrl: './disease-enrich-pathway.component.html',
  styleUrls: ['./disease-enrich-pathway.component.css']
})
export class DiseaseEnrichPathwayComponent implements OnInit {
  diseaseId: number;
  restUrl$: Observable<string>;
  body: object;
  displayedColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'protein_detail'];
  allColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'protein_detail'];

  constructor(private route: ActivatedRoute,
              private rest: RestService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.diseaseId = +params.get('id');
      this.body = {disease_id: this.diseaseId};
      this.restUrl$ = observableOf(
        `TTDiseaseEnrichPathway/ttd_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
    });
  }
}
