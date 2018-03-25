import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-compound-pathway-table',
  templateUrl: './compound-pathway-table.component.html',
  styleUrls: ['./compound-pathway-table.component.css']
})
export class CompoundPathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const compoundId = +params.get('id');
      return ``; // todo add api
    })
  }

}
