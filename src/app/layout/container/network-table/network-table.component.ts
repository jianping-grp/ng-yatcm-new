import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {Node} from '../../../yatcm/models/network/node';
import {Link} from '../../../yatcm/models/network/link';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CompoundCardComponent} from '../../../shared/card/compound-card/compound-card.component';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.css']
})
export class NetworkTableComponent implements OnInit, OnDestroy {
  targetType = 'ttd_target';
  networkDataSubscription: Subscription;
  @Input() restUrl: string;
  @Input() body: object;
  @Input() idType: string;
  @Input() id: number;
  private echart;
  echartOptions: any;
  nodes: Node[];
  links: Link[];
  title: string;
  constructor(private rest: RestService,
              private router: Router,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    console.log('network table init');
    this.ininNetworkOptions();
  }

  ininNetworkOptions() {
    this.echartOptions = {
      height: '1000px',
      title: {
        text: '',
        top: 'bottom',
        left: 'center',
        textStyle: {
          color: '#b2b2b2'
        }
      },
      tooltip: {
        show: true,
        formatter: (el) => {
          switch (el.dataType) {
            case 'node':
              const nameId = el.data['name'].split('-*-');
              return `${nameId[0]}</br>`  +
                `name: ${nameId[1]}</br>`;
            case 'edge': {
              return
            }
          }
        }
      },
      legend: [{
        top: '20px',
        formatter: name,
        selectedMode: 'true',
        left: 10,
        orient: 'vertical',
        data: this.lengendData(),
      }],
      toolbox: {
        show: true,
        feature: {
          dataView : {show: true, readOnly: true},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: '',
        type: 'graph',
        layout: 'force',

        force: {
          repulsion: 50,
          gravity: 0.1,
          edgeLength: [5, 20]
        },
        categories: [
          {'name': 'Herb'},
          {'name': 'Prescription'},
          {'name': 'Compound'},
          {'name': 'Pathway'},
          {'name': 'Target'},
          {'name': 'Disease'}
        ],
        focusNodeAdjacency: true,
        roam: true,
        label: {
          normal: {
            show: false,
            formatter: (el) => {
              // fetch name
              const nameId = el.data['name'].split('-*-');
              return nameId[1];
            },
            position: 'top',
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0,
            type: 'solid'
          }
        }
      }],
    };
  }

  lengendData() {
    {
      if (this.idType === 'prescription') {
        return ['Prescription', 'Herb', 'Compound'];
      } else if (this.idType === 'prescription-herb-target') {
        return ['Herb', 'Target'];
      } else {
        return ['Prescription', 'Herb', 'Compound', 'Pathway', 'Target', 'Disease'];
      }
    }
  }

  ngOnDestroy() {
    this.networkDataSubscription.unsubscribe();
  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
    this.updateNetworkData();
  }

  updateNetworkData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    if (this.idType === 'compound' && this.targetType === 'all_target') {
      this.body = {cpd_id: this.id, only_ttd_target: 'False'};
    } else if (this.idType === 'herb' && this.targetType === 'all_target') {
      this.body = {herb_id: this.id, only_ttd_target: 'False'};
    }
    this.getNetworkData();
  }

  getNetworkData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    this.networkDataSubscription = this.rest.postData(this.restUrl, this.body)
      .subscribe(data => {
          this.nodes = data['nodes'];
          this.links = data['links'];
          console.log('nodes', this.nodes, 'links', this.links);
          if (this.idType === 'prescription-herb-target') {
            if (this.nodes.length > 0) {
              this.title = `Common  TTD targets between two specific herbs`;
            } else if (this.nodes.length === 0) {
              this.title = `common  TTD targets between two specific  herbs(no data)`;
            }
          }
          this.echart.setOption({
            title: {
             text: this.title
            },
            series: [{
              nodes: this.nodes,
              links: this.links
            }]
          });
          this.echart.hideLoading();
        },
        () => {
          this.echart.hideLoading();
        });
  }

  onDbClick(event) {
    // console.log('dbclickevent', event);
   if (event.dataType === 'node') {
     const name = event.data['name'];
     const endSlice = name.indexOf('*') - 1;
     switch (event.data['category']) {
       case 'Prescription': {
         const prescriptionId = +(name.slice(16, endSlice));
         this.router.navigate(['prescription', prescriptionId]);
         break;
       }
       case 'Compound': {
         const compoundId = +(name.slice(12, endSlice));
         // console.log(typeof event.data['name'], event.data['name']);
         this.openDialog(compoundId);
         break;
       }
       case 'Target': {
         const targetId = +(name.slice(10, endSlice));
         this.router.navigate(['target', targetId]);
         break;
       }
       case 'Herb': {
         const herbId = +(name.slice(8, endSlice));
         this.router.navigate(['herb', herbId]);
         break;
       }
       case 'Disease': {
         const diseaseId = +(name.slice(11, endSlice));
         this.router.navigate(['disease', diseaseId]);
         break;
       }
       case 'Pathway': {
         const pathwayId = +(name.slice(11, endSlice));
         const queryParams = {pathwayId: pathwayId};
         if (this.idType === 'prescription') {
           Object.assign(queryParams, {prescriptionId: this.id});
         } else if (this.idType === 'herb') {
           Object.assign(queryParams, {herbId: this.id});
         } else if (this.idType === 'compound') {
           Object.assign(queryParams, {compoundId: this.id});
         } else if (this.idType === 'target') {
           Object.assign(queryParams, {targetId: this.id});
         } else if (this.idType === 'disease') {
           Object.assign(queryParams, {diseaseId: this.id});
         }
         this.router.navigate(['pathway/kegg-map'], {queryParams: queryParams});
         break;
       }
     }
    }
  }

  openDialog(compoundId: number): void {
    const data = {compoundId: compoundId};
    if (this.idType === 'prescription') {
      Object.assign(data, {prescriptionId: this.id});
    }
    this.dialog.open(CompoundCardComponent, {
      width: '400px',
      data: data
    });
  }
}
