import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from "rxjs/observable/of";

@Component({
  selector: 'app-target-pathway-table',
  templateUrl: './target-pathway-table.component.html',
  styleUrls: ['./target-pathway-table.component.css']
})
export class TargetPathwayTableComponent implements OnInit {
  targetId: number;
  // restUrl$: Observable<string>;
  onlyMapPathwayRestUrl$: Observable<string>;
  enrichPathwayRestUrl$: Observable<string>;
  body: object;
  displayedColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'protein_detail'];
  allColumns = ['name', 'category', 'count', 'p_value', 'gene_ratio', 'q_value',
    'p_adjust', 'bg_ratio', 'gene_id', 'kegg_id', 'protein_detail'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.targetId = +params.get('id');
      // return `keggpathways/?filter{keggprotein_set.targets.id}=${this.targetId}` +
      //   `&include[]=category.*`;
      this.body = {tgt_id: this.targetId};
      this.enrichPathwayRestUrl$ = observableOf(
        `TargetEnrichPathway/target_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
      this.onlyMapPathwayRestUrl$ = observableOf(
        `keggpathwaysexclude/target_only_map_kegg_list/?include[]=category.*`);
    });
  }
}
