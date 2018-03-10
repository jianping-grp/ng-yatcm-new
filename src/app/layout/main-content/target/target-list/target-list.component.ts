import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TargetListParamsType} from '../../../../yatcm/enum/target-list-param-type.enum';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})

export class TargetListComponent implements OnInit {

  includeParams = 'include[]=compounds.id&exclude[]=compounds.*';
  restUrl$: Observable<string>;
  displayedColumns = ['target_name', 'uniprot_name', 'gene_name', 'tcmid_link'];
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('target list init');
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case TargetListParamsType.target:
            return `targets/?${this.includeParams}`;
        }
      }
    });
  }
}
