import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-compound-prescription-table',
  templateUrl: './compound-prescription-table.component.html',
  styleUrls: ['./compound-prescription-table.component.css']
})
export class CompoundPrescriptionTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=herbs.id&exclude[]=herbs.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const compoundId = +params.get('id');
      return `prescriptions/?filter{herbs.compounds.id}=${compoundId}${this.includeParams}`;
    });
  }
}
