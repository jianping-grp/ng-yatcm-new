import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Target} from '../../../../yatcm/models/target';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})
export class TargetDetailComponent implements OnInit {
  targetId: number;
  target: Target;
  constructor(private route: ActivatedRoute,
              private rest: RestService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.targetId = +params.get('id');
      // fetch target
      this.rest.getDataList(`targets/?filter{id}=${this.targetId}`, 0, 999999)
        .subscribe(data => {
          this.target = data['targets'][0];
        });
    });
  }
}
