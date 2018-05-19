import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-herb-network-graph',
  templateUrl: './herb-network-graph.component.html',
  styleUrls: ['./herb-network-graph.component.css']
})

export class HerbNetworkGraphComponent implements OnInit {
  herbId: number;
  herbHerbSharedTargetsRestUrl$: Observable<string>;
  herbHerbSharedDiseasesRestUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.paramMap
      .subscribe((params: ParamMap) => {
        this.herbId = +(params.get('id'));
        this.herbHerbSharedTargetsRestUrl$ = observableOf(`herbnetworks/herb/?herb_id=${this.herbId}`);
        this.herbHerbSharedDiseasesRestUrl$ = observableOf(`herbdiseasenetworks/herb/?herb_id=${this.herbId}`);
      });
  }
}
