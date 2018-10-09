import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {Node} from '../../../yatcm/models/network/node';
import {Link} from '../../../yatcm/models/network/link';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CompoundCardComponent} from '../../../shared/card/compound-card/compound-card.component';
import {Subscription} from 'rxjs/Subscription';
import {CompoundParamInterpretation} from "../../../yatcm/enum/compound-param-interpretation.enum";

@Component({
  selector: 'app-network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.css']
})
export class NetworkTableComponent implements OnInit, OnDestroy {
  targetType = 'True';
  networkDataSubscription: Subscription;
  showLabel = false;
  series: any;
  matTooltip = CompoundParamInterpretation;
  @Input() restUrl: string;
  @Input() body: object;
  @Input() idType: string;
  @Input() id: number;
  private echart;
  echartOptions: any;
  nodes: Node[];
  links: Link[];
  title: string;
  dl = 0.3;
  starsMin = 0;
  starsMax = 5;
  qpbbMin = -3;
  qpbbMax = 1.2;
  rofMin = 0;
  rofMax = 4;
  phoaMin = 0;
  phoaMax = 100;
  displayFilterParams: boolean;

  constructor(private rest: RestService,
              private router: Router,
              public dialog: MatDialog) {

  }



  ngOnInit() {
    console.log('network table init');
    this.displayFilterParams = !(this.idType === 'prescription-herb-target' || this.idType === 'prescription-herb-disease');
    this.inintNetworkOptions();
  }


  inintNetworkOptions() {
    this.series = {
      name: '',
      type: 'graph',
      layout: 'circular',
      // layout: 'force',
      // force: {
      //   repulsion: 100,
      //   gravity: 0.1,
      //   edgeLength: [20, 50]
      // },
      categories: [
        {'name': 'Herb'},
        {'name': 'Prescription'},
        {'name': 'Compound'},
        {'name': 'Pathway'},
        {'name': 'Target'},
        {name: 'Disease',
          itemStyle: {
            color: '#56cc9d'
          }
        }
      ],
      focusNodeAdjacency: true,
      roam: true,
      label: {
        normal: {
          show: this.showLabel,
          formatter:
            (el) => {
            // fetch name
            const nameId = el.data['id'].split('-*-');
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
      },
    };
    this.echartOptions = {
      height: '1000px',
      title: {
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
            case 'node': {
              const nameId = el.data['id'].split('-*-');
              if (el.data['category'] === 'Pathway') {
                return `${nameId[0]}</br>` +
                  `english_name: ${nameId[1]}</br>` +
                  `kegg_id: ${nameId[2]} `;
              } else if (el.data['category'] === 'Prescription') {
                return `${nameId[0]}</br>` +
                  `chinese_name: ${nameId[1]}</br>` +
                  `english_name: ${nameId[2]}`;
              } else {
                return `${nameId[0]}</br>` +
                  `english_name: ${nameId[1]}</br>`;
              }
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
          dataView: {show: false, readOnly: true},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      animationDuration: 1000,
      animationEasingUpdate: 'quinticInOut',
      series: [this.series]
    };
  }

  lengendData() {
    {
      if (this.idType === 'prescription') {
        return ['Prescription', 'Herb', 'Compound'];
      } else if (this.idType === 'prescription-herb-target') {
        return ['Herb', 'Target'];
      } else if (this.idType === 'prescription-herb-disease') {
        return ['Herb', 'Disease'];
      } else if (this.idType === 'disease') {
        return ['Compound', 'Target', 'Pathway', 'Disease'];
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
    if (this.displayFilterParams) {
      this.body['DL'] = this.dl;
      this.body['stars'] = `${this.starsMin}~${this.starsMax}`;
      this.body['QPlogBB'] = `${this.qpbbMin}~${this.qpbbMax}`;
      this.body['RuleOfFive'] = `${this.rofMin}~${this.rofMax}`;
      this.body['PercentHumanOralAbsorption'] = `${this.phoaMin}~${this.phoaMax}`;
    }
   // if (this.idType === 'compound' && this.targetType === 'all_target') {
    //   this.body = {cpd_id: this.id, only_ttd_target: 'False'};
    // } else if (this.idType === 'herb' && this.targetType === 'all_target') {
    //   this.body = {herb_id: this.id, only_ttd_target: 'False'};
    // }
    if (this.idType === 'compound' || this.idType === 'herb') {
      this.body['only_ttd_target'] = this.targetType;
    }
    // console.log(this.body); // todo delete
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
          if (this.idType === 'prescription-herb-target') {
            if (this.nodes.length > 0) {
              this.title = `Common  TTD targets between two specific herbs in this prescription`;
            } else if (this.nodes.length === 0) {
              this.title = `common  TTD targets between two specific  herbs(no data) in this prescription`;
            }
          } else if (this.idType === 'prescription-herb-disease') {
            if (this.nodes.length > 0) {
              this.title = `Common  TTD Disease between two specific herbs in this prescription`;
            } else if (this.nodes.length === 0) {
              this.title = `common  TTD Disease between two specific  herbs(no data) in this prescription`;
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


  showNodeLabel() {
    this.series.label.normal.show = this.showLabel;
    this.echart.setOption(this.echartOptions);
  }

  onDbClick(event) {
    // console.log('dbclickevent', event);
    if (event.dataType === 'node') {
      const name = event.data['id'];
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
    } else if (this.idType === 'disease') {
      Object.assign(data, {diseaseId: this.id});
    }
    this.dialog.open(CompoundCardComponent, {
      width: '400px',
      data: data
    });
  }

  gotoTargetList() {
    this.router.navigate(['network-datatable/target-list'], {
      queryParams: {
        prescriptionId: this.id
      }
    });
  }

  gotoDiseaseList() {
    this.router.navigate(['network-datatable/disease-list'], {
      queryParams: {
        prescriptionId: this.id
      }
    });
  }
}
