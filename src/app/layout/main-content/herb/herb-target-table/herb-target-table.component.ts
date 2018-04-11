import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-herb-target-table',
  templateUrl: './herb-target-table.component.html',
  styleUrls: ['./herb-target-table.component.css']
})

export class HerbTargetTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*' +
    '&include[]=disease_set.id.*&exclude[]=disease_set.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
     this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
       const herbId = +params.get('id');
       return `targets/?filter{compounds.herb_set.id}=${herbId}${this.includeParams}`;
     });
  }
}
