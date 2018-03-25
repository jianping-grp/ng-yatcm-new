import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-herb-compound-table',
  templateUrl: './herb-compound-table.component.html',
  styleUrls: ['./herb-compound-table.component.css']
})
export class HerbCompoundTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const herbId = +params.get('id');
      return `compounds/?filter{herb_set.id}=${herbId}`;
    });
  }

}
