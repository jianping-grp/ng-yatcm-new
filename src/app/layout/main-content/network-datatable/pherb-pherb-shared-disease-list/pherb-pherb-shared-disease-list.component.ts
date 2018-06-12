import {Component, OnInit} from '@angular/core';
import {Herb} from '../../../../yatcm/models/herb';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-pherb-pherb-shared-disease-list',
  templateUrl: './pherb-pherb-shared-disease-list.component.html',
  styleUrls: ['./pherb-pherb-shared-disease-list.component.css']
})
export class PherbPherbSharedDiseaseListComponent implements OnInit {
  herbList: Herb[];
  includeParams = '&exclude[]=*&include[]=Chinese_name&include[]=English_name&include[]=id';
  selectedHerb = [];
  restUrl$: Observable<string>;
  constructor(private rest: RestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const prescriptionId = params.get('prescriptionId');
      this.rest.getDataList(
        `herbs/?filter{prescription_set.id}=${prescriptionId}${this.includeParams}`,
        0, 99999)
        .subscribe(data => {
          this.herbList = data['herbs'];
          this.selectedHerb.push(this.herbList[0].id, this.herbList[1].id);
          this.getRestUrl$();
        });
    });
  }

  getRestUrl$() {
    let herbsString = '';
    this.selectedHerb.forEach(el => {
      herbsString = herbsString + el.toString() + ',';
    });
    herbsString = herbsString.substring(0, herbsString.length - 1);
    this.restUrl$ = observableOf(`ttddisease/variable_number_herbs_disease_list/?herb_id_list=${herbsString}`);
  }



}
