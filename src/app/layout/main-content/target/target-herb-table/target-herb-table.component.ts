import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-herb-table',
  templateUrl: './target-herb-table.component.html',
  styleUrls: ['./target-herb-table.component.css']
})
export class TargetHerbTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParams = '&include[]=compounds.id&exclude[]=compounds.*';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const targetId = +params.get('id');
      return `herbs/?filter{compounds.target_set.id}=${targetId}${this.includeParams}`;
    });
  }
}
