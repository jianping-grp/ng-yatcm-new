import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-herb-prescription-table',
  templateUrl: 'herb-prescription-table.component.html',
  styleUrls: ['./herb-prescription-table.component.css']
})
export class HerbPrescriptionTableComponent implements OnInit {
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('herb prescription init');
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      const herbId = +(params.get('id'));
      return `prescriptions/?filter{herbs.id}=${herbId}`;
    });
  }

}
