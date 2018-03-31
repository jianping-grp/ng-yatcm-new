import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CompoundListParamsType} from '../../../../yatcm/enum/compound-list-param-type.enum';

@Component({
  selector: 'app-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.css']
})
export class CompoundListComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '';

  displayedColumns = ['molecule', 'english_name', 'formula', 'mol_weight', 'alogp',
    // 'cid', 'cas',
    'psa', 'hba', 'hbd', 'rtb'];
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    console.log('compound list init');
    this.restUrl$ = this._getRestUrl();
  }



  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case CompoundListParamsType.compound:
            return `compounds/?${this.includeParams}`;
          case CompoundListParamsType.herb_id:
            const herbId = +params.get('herbId');
            return `compounds/?filter{herb_set.id}=${herbId}`;
          case CompoundListParamsType.target_id:
            const targetId = +params.get('targetId');
            return `compounds/?filter{target_set.id}=${targetId}`;
        }
      }
    });
  }
}
