import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from "rxjs/observable/of";

@Component({
  selector: 'app-compound-pathway-table',
  templateUrl: './compound-pathway-table.component.html',
  styleUrls: ['./compound-pathway-table.component.css']
})
export class CompoundPathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  compoundId: number;
  body: object;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
     this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('id');
      this.body = {cpd_id: this.compoundId};
      this.restUrl$ = observableOf(`keggpathwaysexclude/cpd_map_kegg_list/?include[]=category.*`);
    });
  }

}
