import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Seatarget} from "../../../../yatcm/models/seatarget";
import {MatTableDataSource} from "@angular/material";
import {PageMeta} from "../../../../yatcm/models/page-meta";

@Component({
  selector: 'app-compound-sea-target',
  templateUrl: 'compound-sea-target.component.html',
  styleUrls: ['./compound-sea-target.component.css']
})
export class CompoundSeaTargetComponent implements OnInit {
  seaTarget: Seatarget[];
  dataSource = new MatTableDataSource();
  pageMeta:  PageMeta[] | null;
  compoundId: number;
  constructor(private route: ActivatedRoute,
              private rest: RestService) {
  }

  ngOnInit() {
    console.log('compound sea target init');
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('id');
    });
  }
}
