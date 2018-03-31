import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-disease-pathway-table',
  templateUrl: './disease-pathway-table.component.html',
  styleUrls: ['./disease-pathway-table.component.css']
})
export class DiseasePathwayTableComponent implements OnInit {
  restUrl$: Observable<string>;
  diseaseId: number;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.diseaseId = +params.get('id');
      return `keggpathways/?filter{keggprotein_set.targets.disease_set.id}=${this.diseaseId}` +
        `&include[]=category.*`;
    });
  }
}
