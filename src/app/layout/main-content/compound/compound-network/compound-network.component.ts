import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-compound-network',
  templateUrl: './compound-network.component.html',
  styleUrls: ['./compound-network.component.css']
})
export class CompoundNetworkComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const compoundId  = +params.get('id');
      return ``; // todo add api
    })
  }
}
