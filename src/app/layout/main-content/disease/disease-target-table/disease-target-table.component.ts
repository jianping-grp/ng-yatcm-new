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
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const diseaseId = +params.get('id');
      return `targets/?filter{disease_set.id}=${diseaseId}`;
    });
  }
}
