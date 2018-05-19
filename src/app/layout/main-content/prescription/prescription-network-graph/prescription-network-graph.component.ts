import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-prescription-network-graph',
  templateUrl: './prescription-network-graph.component.html',
  styleUrls: ['./prescription-network-graph.component.css']
})
export class PrescriptionNetworkGraphComponent implements OnInit {
  herbTargetsRestUrl: string;
  herbDiseaseRestUrl: string;
  prescriptionId: number;
  body: object;
  herbHerbSharedTargetsRestUrl$: Observable<string>;
  herbherbSharedDiseseaRestUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.herbTargetsRestUrl = 'herbnetworks/customize_prescription_herb/';
    this.herbDiseaseRestUrl = 'herbdiseasenetworks/customize_prescription_herb/';
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
      this.herbHerbSharedTargetsRestUrl$ = observableOf(
        `herbnetworks/prescription/?prescription_id=${this.prescriptionId}`);
      this.herbherbSharedDiseseaRestUrl$ = observableOf(
        `herbdiseasenetworks/prescription/?prescription_id=${this.prescriptionId}`);
    });
  }
}
