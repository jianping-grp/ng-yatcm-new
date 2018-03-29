import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-disease-prescription-table',
  templateUrl: './disease-prescription-table.component.html',
  styleUrls: ['./disease-prescription-table.component.css']
})
export class DiseasePrescriptionTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const diseaseId = +params.get('id');
      return `prescriptions/?filter{herbs.compounds.target_set.disease_set.id}=${diseaseId}`;
    });
  }
}
