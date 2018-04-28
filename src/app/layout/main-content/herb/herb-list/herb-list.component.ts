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
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*';
  restUrl$: Observable<string>;
  displayedColumns = ['image', 'Chinese_name', 'English_name', 'phonetic_name',
      'effect',
    // 'drug_property',
    // 'first_category',
    // 'wiki_chinese', 'wiki_english', 'second_category', 'ingredients',
    // 'subherb', 'latin_name', 'detail',  'related_herb'
    'indication',
    // 'meridians'
  ];

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
         case HerbListParamsType.chinese_name:
           const chineseName = params.get('chineseName');
           return `herbs/?filter{Chinese_name.icontains}=${chineseName}${this.includeParams}`;
         case HerbListParamsType.english_name:
           const englishName = params.get('englishName');
           return `herbs/?filter{English_name.icontains}=${englishName}${this.includeParams}`;
         case HerbListParamsType.pinyin_name:
           const pinyingName = params.get('phoneticName');
           return `herbs/?filter{pinyin_name.icontains}=${pinyingName}${this.includeParams}`;
       }
     }
    });
  }
}
