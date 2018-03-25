import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-compound-target-table',
  templateUrl: './compound-target-table.component.html',
  styleUrls: ['./compound-target-table.component.css']
})
export class CompoundTargetTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const compoundId = +params.get('id');
      return `targets/?filter{compounds.id}=${compoundId}`;
    });
  }

}
