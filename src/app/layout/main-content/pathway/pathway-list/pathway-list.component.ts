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
  includeParams = 'include[]=category.name&exclude[]=category.*';
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
        }
      }
    });
  }
}
