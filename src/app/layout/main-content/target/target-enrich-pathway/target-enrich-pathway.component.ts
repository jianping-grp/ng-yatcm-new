import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-target-enrich-pathway',
  templateUrl: './target-enrich-pathway.component.html',
  styleUrls: ['./target-enrich-pathway.component.css']
})
export class TargetEnrichPathwayComponent implements OnInit {
  targetId: number;
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
      this.targetId = +params.get('id');
      this.body = {tgt_id: this.targetId};
      this.restUrl$ = observableOf(
        `TargetEnrichPathway/target_map_enrich_kegg_list/?include[]=pathway.*&include[]=pathway.category.*`);
    });
  }
}
