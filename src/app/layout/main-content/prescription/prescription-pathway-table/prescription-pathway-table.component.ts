import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of as observableOf} from "rxjs/observable/of";

@Component({
  selector: 'app-prescription-pathway-table',
  templateUrl: './prescription-pathway-table.component.html',
  styleUrls: ['./prescription-pathway-table.component.css']
})
export class PrescriptionPathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  prescriptionId: number;
  body: object;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.body = {prescription_id: this.prescriptionId};
      this.restUrl$ = observableOf(`keggpathwaysexclude/prescription_map_kegg_list/?include[]=category.*`);
    });
  }

}
