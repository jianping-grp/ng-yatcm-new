import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-compound-disease-table',
  templateUrl: './compound-disease-table.component.html',
  styleUrls: ['./compound-disease-table.component.css']
})
export class CompoundDiseaseTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const compoundId = +params.get('id');
      return `disease/?filter{targets.compounds.id}=${compoundId}`;
    });
  }

}
