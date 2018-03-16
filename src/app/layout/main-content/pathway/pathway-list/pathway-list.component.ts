import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PathwayListParamsType} from '../../../../yatcm/enum/pathway-list-param-type.enum';

@Component({
  selector: 'app-pathway-list',
  templateUrl: './pathway-list.component.html',
  styleUrls: ['./pathway-list.component.css']
})
export class PathwayListComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = 'include[]=category.*';
  displayedColumns = ['pathway_name', 'category', 'kegg_id', 'detail'];
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    console.log('pathway list init');
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case PathwayListParamsType.pathway:
            return `keggpathways/?${this.includeParams}`;
          case PathwayListParamsType.herb_id:
            const herbId = +params.get('herbId');
            return `keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.id}=${herbId}` +
              `${this.includeParams}`;
          case PathwayListParamsType.prescription_id:
            const prescriptionId = +params.get('prescriptionId');
            return `keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.prescription.id}=` +
              `${prescriptionId}${this.includeParams}`;
        }
      }
    });
  }



}

