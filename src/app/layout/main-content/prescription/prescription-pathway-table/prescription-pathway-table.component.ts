import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-prescription-pathway-table',
  templateUrl: './prescription-pathway-table.component.html',
  styleUrls: ['./prescription-pathway-table.component.css']
})
export class PrescriptionPathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const prescriptionId = +params.get('id');
      return ``;
    })
  }

}
