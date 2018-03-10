import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PrescriptionListParamsType} from '../../../../yatcm/enum/prescription-list-param-type.enum';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  restUrl$: Observable<string>;
  includeParams = '?inlcude[]=herbs.id&exclude[]=herbs.*';
  displayedColumns = ['chinese_name', 'english_name', 'phonetic_name', 'main_prescription', 'prescription_herb',
    'traditional_usage', 'modern_usage', 'modern_usage(english)', 'traditional_application', 'detail'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('prescription list init');
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case PrescriptionListParamsType.prescription:
            return `prescriptions/${this.includeParams}`;
          case PrescriptionListParamsType.herb_id:
            const herbId = +params.get('herbId');
            return `prescriptions/?filter{herbs.id}=${herbId}`;
        }
      }
    });
  }
}
