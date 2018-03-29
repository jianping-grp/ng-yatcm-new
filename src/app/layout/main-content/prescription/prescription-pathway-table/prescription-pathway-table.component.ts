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
  prescriptionId: number;
  body: Object;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
      return `keggpathways/prescription_map_kegg_list/?include[]=category.*`;
    });
  }

}
