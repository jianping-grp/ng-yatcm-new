import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from "rxjs/observable/of";

@Component({
  selector: 'app-disease-pathway-table',
  templateUrl: './disease-pathway-table.component.html',
  styleUrls: ['./disease-pathway-table.component.css']
})
export class DiseasePathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  onlyMapPathwayRestUrl$: Observable<string>;
  enrichPathwayRestUrl$: Observable<string>;
  diseaseId: number;
  body: object;
  displayedColumns = ['name', 'category',  'kegg_id', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'protein_detail'];
  allColumns = ['name', 'category',  'kegg_id', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id','protein_detail'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.diseaseId = +params.get('id');
      // return `keggpathways/?filter{keggprotein_set.targets.ttddisease_set.id}=${this.diseaseId}` +
      //   `&include[]=category.*`;
      this.body = {disease_id: this.diseaseId};
      this.enrichPathwayRestUrl$ = observableOf(
        `TTDDiseaseEnrichPathway/ttd_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
      this.onlyMapPathwayRestUrl$ = observableOf(
        `keggpathwaysexclude/ttddisease_only_map_kegg_list/?include[]=category.*`);
    });
  }
}
