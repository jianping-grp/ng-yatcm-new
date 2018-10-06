import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {RestService} from "../../../services/rest/rest.service";
import {Node} from '../../../yatcm/models/network/node';
import {Link} from '../../../yatcm/models/network/link';
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'app-cy-network-table',
  templateUrl: './cy-network-table.component.html',
  styleUrls: ['./cy-network-table.component.css']
})
export class CyNetworkTableComponent implements OnInit, OnDestroy{
  nodes: any;
  links: any;
  @Input() restUrl: string;
  @Input() body: any;
  @Input() idType: string;
  @Input() id: number;
  graphData: any;
  subScription: Subscription;
  constructor(private rest: RestService) { }

  ngOnInit() {
  this.subScription = this.rest.postData(this.restUrl, this.body)
      .subscribe(data => {
        this.nodes = data['nodes'];
        this.links =  data['edges'];
        console.log(data); // todo delete
        this.graphData = {
          nodes: this.nodes,
          edges: this.links
        };
        });
  }

  // ngAfterViewInit() {
  //   this.graphData = {
  //     nodes: this.nodes,
  //     edges: this.links
  //   };
  // }
 ngOnDestroy() {
    this.subScription.unsubscribe();
 }

}
