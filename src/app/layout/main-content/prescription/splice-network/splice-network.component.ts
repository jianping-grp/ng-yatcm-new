import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-prescription-splice-network',
  templateUrl: './splice-network.component.html',
  styleUrls: ['./splice-network.component.css']
})
export class SpliceNetworkComponent implements OnInit {
  restUrl: string;
  compoundId: number;
  body: object;
  constructor(private route: ActivatedRoute)  {

  }

  ngOnInit() {
    console.log('splice network init');
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.compoundId = +(params.get('compoundId'));
      this.body = {cpd_id: this.compoundId};
      this.restUrl = 'compounds/compound_network/';
    });
  }

}
