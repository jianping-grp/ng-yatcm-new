import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-prescription-network',
  templateUrl: './prescription-network.component.html',
  styleUrls: ['./prescription-network.component.css']
})
export class PrescriptionNetworkComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const prescriptionId = +params.get('id');
      return ``; // todo add api
    });
  }
}
