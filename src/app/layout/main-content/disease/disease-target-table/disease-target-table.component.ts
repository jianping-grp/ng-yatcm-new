import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-disease-target-table',
  templateUrl: './disease-target-table.component.html',
  styleUrls: ['./disease-target-table.component.css']
})
export class DiseaseTargetTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*' +
    '&include[]=disease_set.id.*&exclude[]=disease_set.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const diseaseId = +params.get('id');
      return `targets/?filter{disease_set.id}=${diseaseId}${this.includeParams}`;
    });
  }
}
