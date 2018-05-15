import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-prescription-herb-target-network-graph',
  templateUrl: './prescription-herb-target-network-graph.component.html',
  styleUrls: ['./prescription-herb-target-network-graph.component.css']
})
export class PrescriptionHerbTargetNetworkGraphComponent implements OnInit {
  herbTargetsRestUrl: string;
  prescriptionId: number;
  body: object;
  herbHerbRestUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.herbTargetsRestUrl = 'herbnetworks/customize_prescription_herb/';
    this.herbHerbRestUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
      return `herbnetworks/prescription/?prescription_id=${this.prescriptionId}`;
    });
  }
}
