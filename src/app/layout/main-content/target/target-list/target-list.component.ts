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

  includeParams = '&include[]=compounds.id&exclude[]=compounds.*' +
                  '&include[]=disease_set.id.*&exclude[]=disease_set.*';
  restUrl$: Observable<string>;
  displayedColumns = ['target_name', 'uniprot_name', 'gene_name', 'tcmid_link', 'detail'];
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
          case TargetListParamsType.target_name:
            const targetName = params.get('targetName');
            return `targets/?filter{target_name.icontains}=${targetName}${this.includeParams}`;
          case TargetListParamsType.uniprot_name:
            const uniprotName = params.get('uniprotName');
            return `targets/?filter{uniprot_name.icontains}=${uniprotName}${this.includeParams}`;
          case TargetListParamsType.gene_name:
            const geneName = params.get('geneName');
            return `targets/?filter{gene_name.icontains}=${geneName}${this.includeParams}`;
          case TargetListParamsType.herb_herb: {
            const first_herb = +(params.get('first_herb'));
            const second_herb = +(params.get('second_herb'));
            let topAct = +(params.get('top'));
            if (isNaN(topAct)) {
              topAct = 0;
            }
            return `targets/herb_target_list/?first_herb=${first_herb}&second_herb=${second_herb}` +
              `&top=${topAct}${this.includeParams}`;
          }
          case TargetListParamsType.pathway_mapping: {
            // herb 与 herb 共同的target的共同的pathway 所映射回的 target_list
            const first_herb = +(params.get('first_herb'));
            const second_herb = +(params.get('second_herb'));
            return `targets/herb_herb_tgt_list_in_pathways/?first_herb_id=${first_herb}` +
              `&second_herb_id=${second_herb}${this.includeParams}`;
          }
        }
      }
    });
  }
}
