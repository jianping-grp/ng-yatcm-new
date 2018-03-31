import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';

@Component({
  selector: 'app-pathway-protein-detail',
  templateUrl: './pathway-protein-detail.component.html',
  styleUrls: ['./pathway-protein-detail.component.css']
})
export class PathwayProteinDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private rest: RestService) {

  }
  ngOnInit() {

  }
}
