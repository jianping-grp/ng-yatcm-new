import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-herb-pathway-table',
  templateUrl: './herb-pathway-table.component.html',
  styleUrls: ['./herb-pathway-table.component.css']
})

export class HerbPathwayTableComponent implements OnInit {
  restUrl$: Observable<string>
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
     this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const herbId = +params.get('id');
      return ``; // todo add api
    })
  }

}
