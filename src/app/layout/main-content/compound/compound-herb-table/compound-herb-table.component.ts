import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-compound-herb-table',
  templateUrl: './compound-herb-table.component.html',
  styleUrls: ['./compound-herb-table.component.css']
})
export class CompoundHerbTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const compoundId = +params.get('id');
      return `herbs/?filter{compounds.id}=${compoundId}${this.includeParams}`;
    });
  }
}
