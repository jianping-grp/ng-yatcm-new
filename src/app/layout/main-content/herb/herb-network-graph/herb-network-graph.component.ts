import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-herb-network-graph',
  templateUrl: './herb-network-graph.component.html',
  styleUrls: ['./herb-network-graph.component.css']
})

export class HerbNetworkGraphComponent implements OnInit {
  herbId: number;
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   this.restUrl$ =  this.route.parent.paramMap
      .map((params: ParamMap) => {
        this.herbId = +(params.get('id'));
        return `herbnetworks/herb/?herb_id=${this.herbId}`;
      });
  }
}
