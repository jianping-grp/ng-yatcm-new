import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from "rxjs/observable/of";

@Component({
  selector: 'app-herb-pathway-table',
  templateUrl: './herb-pathway-table.component.html',
  styleUrls: ['./herb-pathway-table.component.css']
})

export class HerbPathwayTableComponent implements OnInit {
  // restUrl$: Observable<string>;
  onlyMapPathwayRestUrl$: Observable<string>;
  enrichPathwayRestUrl$: Observable<string>;
  herbId: number;
  body: object;
  displayedColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'compound_detail', 'protein_detail'];
  allColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'compound_detail', 'protein_detail'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    //  this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
    //   this.herbId = +params.get('id');
    //   this.body = {herb_id: this.herbId};
    //   return `keggpathwaysexclude/herb_map_kegg_list/?include[]=category.*`;
    // });
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.herbId = +params.get('id');
      this.body = {herb_id: this.herbId};
      // this.restUrl$ = observableOf(`keggpathwaysexclude/herb_map_kegg_list/?include[]=category.*`);
      this.onlyMapPathwayRestUrl$ = observableOf(`keggpathwaysexclude/herb_only_map_kegg_list/?include[]=category.*`);
      this.enrichPathwayRestUrl$ = observableOf(
        `HerbEnrichPathway/herb_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);

    });
  }

}
