import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-disease-pathway-table',
  templateUrl: './disease-pathway-table.component.html',
  styleUrls: ['./disease-pathway-table.component.css']
})
export class DiseasePathwayTableCompoent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const diseaseId = +params.get('id');
      return `keggpathways/?filter{keggproteins_set.targets.disease_set.id}=${diseaseId}`;
    });
  }
}
