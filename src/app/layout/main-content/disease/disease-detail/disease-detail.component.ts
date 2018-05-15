import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Disease} from '../../../../yatcm/models/disease';
import {TtdDisease} from '../../../../yatcm/models/ttd-disease';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.css']
})
export class DiseaseDetailComponent implements OnInit {

  ttdDisease: TtdDisease;
  constructor(private route: ActivatedRoute,
              private rest: RestService) {

  }

  ngOnInit() {
    console.log('disease detail init');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const diseaseId = +params.get('id');
      this.rest.getDataList(`ttddisease/?filter{id}=${diseaseId}`, 0, 99999)
        .subscribe(data => {
          this.ttdDisease = data['ttd_diseases'][0];
        });
    });
  }
}
