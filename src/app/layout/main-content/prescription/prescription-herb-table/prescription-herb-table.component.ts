import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-prescription-herb-table',
  templateUrl: './prescription-herb-table.component.html',
  styleUrls: ['./prescription-herb-table.component.css']
})
export class PrescriptionHerbTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const prescriptionId = +(params.get('id'));
      return `herbs/?filter{prescription_set.id}=${prescriptionId}${this.includeParams}`;
    });
  }
}
