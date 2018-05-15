import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-disease-herb-table',
  templateUrl: './disease-herb-table.component.html',
  styleUrls: ['./disease-herb-table.component.css']
})
export class DiseaseHerbTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const diseaseId = +params.get('id');
      return `herbs/?filter{compounds.target_set.ttddisease_set.id}=${diseaseId}${this.includeParams}`;
    });
  }
}
