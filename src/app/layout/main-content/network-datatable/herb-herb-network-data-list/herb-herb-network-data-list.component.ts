import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-herb-target-network-data-list',
  templateUrl: './herb-herb-network-data-list.component.html',
  styleUrls: ['./herb-herb-network-data-list.component.css']
})

export class HerbHerbNetworkDataListComponent implements OnInit {
  restUrl$: Observable<string>;
  displayedColumns = [
    'first_herb', 'second_herb', 'first_herb_image', 'second_herb_image', 'shared_targets'
  ];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router) {

  }

  ngOnInit() {
   this.restUrl$ = this._getRestUrl();
  }
  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      if (params.get('herbId')) {
        const herbId = +(params.get('herbId'));
        return `herbnetworks/herb/?herb_id=${herbId}`;
      } else if (params.has('prescriptionId')) {
        const prescriptionId = +(params.get('prescriptionId'));
        return `herbnetworks/prescription/?prescription_id=${prescriptionId}`
      }
    });
  }
}
