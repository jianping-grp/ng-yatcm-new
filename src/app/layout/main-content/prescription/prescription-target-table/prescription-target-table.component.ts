import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-prescription-target-table',
  templateUrl: './prescription-target-table.component.html',
  styleUrls: ['./prescription-target-table.component.css']
})
export class PrescriptionTargetTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const prescriptionId = +params.get('id');
      return `targets/?filter{compounds.herb_set.prescription_set.id}=${prescriptionId}`;
    });
  }

}
