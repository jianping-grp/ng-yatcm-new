import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-prescription-network',
  templateUrl: './prescription-network.component.html',
  styleUrls: ['./prescription-network.component.css']
})
export class PrescriptionNetworkComponent implements OnInit {
  restUrl: string;
  body: object;
  prescriptionId: number;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl = 'prescriptions/prescription_network_filter/';
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
    });
  }
}
