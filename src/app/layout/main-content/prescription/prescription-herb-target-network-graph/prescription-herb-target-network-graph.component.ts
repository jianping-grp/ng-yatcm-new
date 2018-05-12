import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-prescription-herb-target-network-graph',
  templateUrl: './prescription-herb-target-network-graph.component.html',
  styleUrls: ['./prescription-herb-target-network-graph.component.css']
})
export class PrescriptionHerbTargetNetworkGraphComponent implements OnInit {
  restUrl: string;
  prescriptionId: number;
  body: object;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl = 'herbnetworks/customize_prescription_herb/';
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
    });
  }
}
