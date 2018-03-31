import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-pathway-table',
  templateUrl: './target-pathway-table.component.html',
  styleUrls: ['./target-pathway-table.component.css']
})
export class TargetPathwayTableComponent implements OnInit {
  targetId: number;
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.targetId = +params.get('id');
      return `keggpathways/?filter{keggprotein_set.targets.id}=${this.targetId}` +
        `&include[]=category.*`;
    });
  }
}
