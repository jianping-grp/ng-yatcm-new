import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-herb-pathway-table',
  templateUrl: './herb-pathway-table.component.html',
  styleUrls: ['./herb-pathway-table.component.css']
})

export class HerbPathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  herbId: number;
  body: object;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
     this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.herbId = +params.get('id');
      this.body = {herb_id: this.herbId};
      return `keggpathwaysexclude/herb_map_kegg_list/?include[]=category.*`;
    });
  }

}
