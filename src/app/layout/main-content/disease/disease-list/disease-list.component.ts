import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {GlobalService} from '../../../../services/global/global.service';
import {DiseaseListParamsType} from '../../../../yatcm/enum/disease-list-param-type.enum';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.css']
})
export class DiseaseListComponent implements OnInit {  // this disease is ttd_disease
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute,
              private globlaservice: GlobalService) {

  }

  ngOnInit() {
   this.restUrl$ = this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case DiseaseListParamsType.disease:
            return `ttddisease/?`;
          case DiseaseListParamsType.disease_name:
            const diseaseName = params.get('diseaseName');
            return `ttddisease/?filter{name.icontains}=${diseaseName}`;
          case DiseaseListParamsType.synonyms:
            const synonym = params.get('synonym');
            return `ttddisease/?filter{synonyms.icontains}=${synonym}`;
          case DiseaseListParamsType.target_id:
            const targetId = +params.get('targetId');
            return `ttddisease/?filter{targets.id}=${targetId}`;
          case DiseaseListParamsType.herb_herb: {
            const first_herb = +(params.get('first_herb'));
            const second_herb = +(params.get('second_herb'));
            let topAct = +(params.get('top'));
            if (isNaN(topAct)) {
              topAct = 0;
            }
            return `ttddisease/herb_disease_list/?first_herb=${first_herb}&second_herb=${second_herb}` +
              `&top=${topAct}`;
          }
         }
      }
    });
  }
}
