import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-compound-network',
  templateUrl: './compound-network.component.html',
  styleUrls: ['./compound-network.component.css']
})
export class CompoundNetworkComponent implements OnInit {
  restUrl: string;
  body: object;
  compoundId: number;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('compound network init');
    this.restUrl = `compounds/compound_network/`;
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.compoundId  = +params.get('id');
      this.body = {cpd_id: this.compoundId};
    });
  }
}
