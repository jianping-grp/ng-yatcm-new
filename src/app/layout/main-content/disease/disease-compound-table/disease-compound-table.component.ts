import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-disease-compound-table',
  templateUrl: './disease-compound-table.component.html',
  styleUrls: ['./disease-compound-table.component.css']
})
export class DiseaseCompoundTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const diseaseId = +params.get('id');
      return `compounds/?filter{target_set.ttddisease_set.id}=${diseaseId}`;
    });
  }
}
