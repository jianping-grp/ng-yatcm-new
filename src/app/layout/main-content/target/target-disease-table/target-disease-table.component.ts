import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-target-disease-table',
  templateUrl: './target-disease-table.component.html',
  styleUrls: ['./target-disease-table.component.css']
})
export class TargetDiseaseTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const targetId = +params.get('id');
      return `disease/?filter{targets.id}=${targetId}`;
    });
  }
}
