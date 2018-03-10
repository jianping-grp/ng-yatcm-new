import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HerbListParamsType} from '../../../../yatcm/enum/herb-list-param-type.enum';

@Component({
  selector: 'app-herb-list',
  templateUrl: './herb-list.component.html',
  styleUrls: ['./herb-list.component.css']
})
export class HerbListComponent implements OnInit {
  includeParams = '&include[]=subherb_set.id&exclude[]=subherb_set.*' +
    '&include[]=compounds.id&exclude[]=compounds.*';
  restUrl$: Observable<string>;
  displayedColumns = ['image', 'English_name', 'Chinese_name', 'phonetic_name', 'ingredients', 'first_category',
                      'second_category', 'effect', 'latin_name', 'drug_property', 'wiki_chinese', 'wiki_english', 'indication',
                     'meridians', 'related_herb', 'subherb', 'detail'];

  constructor(private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('herb-list init');
    this.restUrl$ = this._getRestUrl();
  }


  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
     const paramsType = +params.get('paramsType');
     if (paramsType) {
       switch (paramsType) {
         case HerbListParamsType.herb:
           return `herbs/?${this.includeParams}`;
         case HerbListParamsType.prescription_id:
           const prescriptionId = +params.get('prescriptionId');
           return `herbs/?filter{prescription_set.id}=${prescriptionId}${this.includeParams}`;
       }
     }
    });
  }
}
