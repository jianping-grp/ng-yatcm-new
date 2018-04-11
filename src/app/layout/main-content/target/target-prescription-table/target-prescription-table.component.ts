import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-prescription-table',
  templateUrl: `./target-prescription-table.component.html`,
  styleUrls: ['./target-prescription-table.component.css']
})
export class TargetPrescriptionTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=herbs.id&exclude[]=herbs.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const targetId = +params.get('id');
      return `prescriptions/?filter{herbs.compounds.target_set.id}=${targetId}${this.includeParams}`;
    });
  }
}
