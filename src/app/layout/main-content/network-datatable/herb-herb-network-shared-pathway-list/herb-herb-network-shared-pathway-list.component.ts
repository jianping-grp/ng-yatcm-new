import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-herb-herb-network-shared-pathway-list',
  templateUrl: './herb-herb-network-shared-pathway-list.component.html',
  styleUrls: ['./herb-herb-network-shared-pathway-list.component.css']
})
export class HerbHerbNetworkSharedPathwayListComponent implements OnInit {
// this pathway list is enriched by herbs co-module targets
  restUrl$: Observable<string>;
  includeParams = '&include[]=category.*';
  herb_herb_id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl() {
   return this.route.queryParamMap.map((params: ParamMap) => {
      const first_herb_id = params.get('first_herb');
      const second_herb_id = params.get('second_herb');
      this.herb_herb_id = `${first_herb_id},${second_herb_id}`;
      return `keggpathwaysexclude/herb_herb_tgt_kegg_list/` +
          `?first_herb_id=${+(first_herb_id)}&second_herb_id=${+(second_herb_id)}` +
        `${this.includeParams}`;
    });
  }

}
