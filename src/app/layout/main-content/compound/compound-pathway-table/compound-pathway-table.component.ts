import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-compound-pathway-table',
  templateUrl: './compound-pathway-table.component.html',
  styleUrls: ['./compound-pathway-table.component.css']
})
export class CompoundPathwayTableComponent implements OnInit {
  onlyMapPathwayRestUrl$: Observable<string>;
  compoundId: number;
  body: object;
  enrichPathwayRestUrl$: Observable<string>;
  restUrl$: Observable<string>;
  displayedColumns = ['name', 'category', 'kegg_id', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'compound_detail', 'protein_detail'];
  allColumns = ['name', 'category', 'kegg_id','count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id',  'compound_detail', 'protein_detail'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('id');
      this.body = {cpd_id: this.compoundId};
      // this.restUrl$ = observableOf(`keggpathwaysexclude/cpd_map_kegg_list/?include[]=category.*`);
      this.onlyMapPathwayRestUrl$ = observableOf(`keggpathwaysexclude/cpd_only_map_kegg_list/?include[]=category.*`);
      this.enrichPathwayRestUrl$ = observableOf(
        `CompoundEnrichPathway/cpd_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
    });
  }

}
