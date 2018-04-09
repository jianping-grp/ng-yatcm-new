import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {Node} from '../../../yatcm/models/network/node';
import {Link} from '../../../yatcm/models/network/link';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CompoundCardComponent} from '../../../shared/card/compound-card/compound-card.component';

@Component({
  selector: 'app-network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.css']
})
export class NetworkTableComponent implements OnInit {
  @Input() restUrl: string;
  @Input() body: object;
  @Input() idType: string;
  @Input() id: number;
  private echart;
  nodes: Node[];
  links: Link[];
  constructor(private rest: RestService,
              private router: Router,
              public dialog: MatDialog) {

  }
  chartOptions = {
    height: '1000px',
    title: {
      text: '',
      top: 'top',
      left: 'center',
    },
    tooltip: {},
    legend: [{
      top: '20px',
      formatter: name,
      tooltip: {
        show: true
      },
      selectedMode: 'false',
      left: 10,
      orient: 'vertical',
      data: this.idType === 'prescription' ? ['Prescription', 'Herb', 'Compound'] :
        ['Prescription', 'Herb', 'Compound', 'Pathway', 'Target', 'Disease']
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
          formatter: (name) => {
            return name.data['category'];
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

  ngOnInit() {
    console.log('network table init');
  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
    // fetch data
    this.rest.postData(this.restUrl, this.body)
      .subscribe(data => {
        this.nodes = data['nodes'];
        this.links = data['links'];
        console.log('nodes', this.nodes, 'links', this.links);
        this.echart.setOption({
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
    console.log('dbclickevent', event);
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
         console.log(typeof event.data['name'], event.data['name'])
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
