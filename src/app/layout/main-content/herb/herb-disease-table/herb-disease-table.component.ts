import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-herb-disease-table',
  templateUrl: './herb-disease-table.component.html',
  styleUrls: ['./herb-disease-table.component.css']
})
export class HerbDiseaseTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('herb disease table init');
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const herbId = +params.get('id');
      return `disease/?filter{targets.compounds.herb_set.id}=${herbId}`;
    });
  }
}
