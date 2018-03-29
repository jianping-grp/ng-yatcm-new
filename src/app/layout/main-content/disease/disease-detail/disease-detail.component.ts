import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Disease} from '../../../../yatcm/models/disease';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.css']
})
export class DiseaseDetailComponent implements OnInit {

  disease: Disease;
  constructor(private route: ActivatedRoute,
              private rest: RestService) {

  }

  ngOnInit() {
    console.log('disease detail init');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const diseaseId = +params.get('id');
      this.rest.getDataList(`disease/?filter{id}=${diseaseId}`, 0, 99999)
        .subscribe(data => {
          this.disease = data['diseases'][0];
        });
    });
  }
}
