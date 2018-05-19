import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-herb-herb-shared-disease-network-data-list',
  templateUrl: './herb-herb-shared-disease-network-data-list.component.html',
  styleUrls: ['./herb-herb-shared-disease-network-data-list.component.css']
})
export class HerbHerbSharedDiseaseNetworkDataListComponent implements OnInit {
  restUrl$: Observable<string>;
  displayedColumns = ['first_herb', 'second_herb', 'first_herb_image', 'second_herb_image', 'shared_diseases'];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      if (params.get('herbId')) {
        const herbId = +(params.get('herbId'));
        return `herbdiseasenetworks/herb/?herb_id=${herbId}`;
      } else if (params.has('prescriptionId')) {
        const prescriptionId = +(params.get('prescriptionId'));
        return `herbdiseasenetworks/prescription/?prescription_id=${prescriptionId}`;
      }
    });
  }

}
