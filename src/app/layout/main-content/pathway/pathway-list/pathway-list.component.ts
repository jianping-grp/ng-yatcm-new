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
  herbId: number | string;
  prescriptionId: number  | string;
  tableTitle = '';
  pageSize = 10;
  pageSizeOptions = [5, 10, 50, 100];
  restUrl$: Observable<string>;
  includeParams = '&include[]=category.*&include[]=*&exclude[]=kgml';
  displayedColumns = ['pathway_name', 'category', 'kegg_id', 'detail'];
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    console.log('pathway list init');
    this.restUrl$ = this._getRestUrl();
  }

  // 根据不同的参数，生成$url
  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case PathwayListParamsType.pathway:
            return `keggpathways/?${this.includeParams}`;
          case PathwayListParamsType.herb_id:
            this.herbId = +params.get('herbId');
            this.displayedColumns = ['pathway_name', 'category', 'herb_compound_in_kegg_id', 'herb_detail'];
            return `keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.id}=${this.herbId}` +
              `${this.includeParams}`;
          case PathwayListParamsType.prescription_id:
            this.prescriptionId = +params.get('prescriptionId');
            this.displayedColumns = ['pathway_name', 'category', 'prescription_compound_in_kegg_id', 'prescription_detail'];
            return `keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.prescription_set.id}=` +
              `${this.prescriptionId}${this.includeParams}`;
          case PathwayListParamsType.pathway_name:
            const pathwayName = params.get('pathwayName');
            return `keggpathways/?filter{name.icontains}=${pathwayName}${this.includeParams}`;
          case PathwayListParamsType.kegg_id:
            const keggId = params.get('keggId');
            return `keggpathways/?filter{kegg_id}=${keggId}${this.includeParams}`;
        }
      }
    });
  }

}

