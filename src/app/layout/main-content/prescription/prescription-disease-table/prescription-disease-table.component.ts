import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-prescription-disease-table',
  templateUrl: './prescription-disease-table.component.html',
  styleUrls: ['./prescription-disease-table.component.css']
})
export class PrescriptionDiseaseTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const prescriptionId = +params.get('id');
      return `disease/?filter{targets.compounds.herb_set.prescription_set.id}=${prescriptionId}`;
    });

  }

}
