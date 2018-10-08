import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-target-network',
  templateUrl: './target-network.component.html',
  styleUrls: ['./target-network.component.css']
})
export class TargetNetworkComponent implements OnInit {
  restUrl: string;
  body: object;
  targetId: number;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('target network init');
    this.restUrl = 'targets/target_network_filter/';
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.targetId = +params.get('id');
      this.body = {tgt_id: this.targetId};
    });
  }
}
