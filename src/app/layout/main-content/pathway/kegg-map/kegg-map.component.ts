import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-kegg-map',
  templateUrl: './kegg-map.component.html',
  styleUrls: ['./legg-map.component.css']
})

export class KeggMapComponent implements OnInit {
  constructor(private rest: RestService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('kegg map init');
  }

  private _getData('')
}
