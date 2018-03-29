import {Component, OnInit} from "@angular/core";
import {RestService} from "../../../services/rest/rest.service";

@Component({
  selector: 'app-network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.css']
})
export class NetworkTableComponent implements OnInit {
  constructor(rest: RestService) {

  }

  ngOnInit() {
    console.log('network table init');
  }
}
