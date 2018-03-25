import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-prescription-compound-target',
  templateUrl: './prescription-compound-table.component.html',
  styleUrls: ['./prescription-compound-table.component.css']
})
export class PrescriptionCompoundTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const prescriptionId = +params.get('id');
      return `compounds/?filter{herb_set.prescription_set.id}=${prescriptionId}`;
    });
  }
}
