import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {GlobalService} from "../../../../services/global/global.service";

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.css']
})
export class DiseaseListComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private globlaservice: GlobalService) {

  }

  ngOnInit() {

  }
}
