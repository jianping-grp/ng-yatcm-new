import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-disease-network',
  templateUrl: './disease-network.component.html',
  styleUrls: ['./disease-network.component.css']
})
export class DiseaseNetworkComponent implements OnInit {
  restUrl: string;
  body: object;
  diseaseId: number;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('disease network init');
    this.restUrl = 'disease/disease_network/';
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.diseaseId = +params.get('id');
      this.body = {disease_id: this.diseaseId};
    });
  }
}
