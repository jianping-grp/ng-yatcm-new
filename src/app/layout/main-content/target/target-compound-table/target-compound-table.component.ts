import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-compound-table',
  templateUrl: './target-compound-table.component.html',
  styleUrls: ['./target-compound-table.component.css']
})
export class TargetCompoundTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const targetId = +params.get('id');
      return `compounds/?filter{target_set.id}=${targetId}`;
    });
  }
}
