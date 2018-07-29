import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Herb} from '../../../yatcm/models/herb';
import {GlobalService} from '../../../services/global/global.service';
import {Observable} from 'rxjs/Observable';
import {HerbDiseaseNetwork} from '../../../yatcm/models/herb-disease-network/herb-disease-network';
import {DiseaseListParamsType} from '../../../yatcm/enum/disease-list-param-type.enum';

@Component({
  selector: 'app-herb-herb-shared-disease-network-graph',
  templateUrl: './herb-herb-shared-disease-network-graph.component.html',
  styleUrls: ['./herb-herb-shared-disease-network-graph.component.css']
})
export class HerbHerbSharedDiseaseNetworkGraphComponent implements OnInit, OnDestroy {

  herbList: Herb[];
  series: any;
  echartOptions: any;
  data: any;
  showLabel = false;
  restUrl: string;
  @Input() restUrl$: Observable<string>;
  @Input() id: number;
  @Input() idType: string;
  lengthThreshold = 1; // shared number of targets threshold
  private echartNetwork; // network graph instance
  herbDiseaseNetworkList: HerbDiseaseNetwork[]; // full link data
  herbIdSubscription: Subscription;
  includeParams = '&exclude[]=first_herb.*&include[]=first_herb.id' +
    '&include[]=first_herb.Chinese_name&include[]=first_herb.English_name' +
    '&exclude[]=second_herb.*&include[]=second_herb.id' +
    '&include[]=second_herb.Chinese_name&include[]=second_herb.English_name';

  constructor(private rest: RestService,
              private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService) {

  }

  ngOnInit() {
    this.initNetworkOption();
    this.herbIdSubscription = this.restUrl$
      .subscribe(data => {
        this.restUrl = `${data}` + `${this.includeParams}`;
        this.getData();
      });
  }

  onChartInit(ec) {
    this.echartNetwork = ec;
    this.echartNetwork.showLoading();
  }

  ngOnDestroy() {
    this.herbIdSubscription.unsubscribe();
  }

  private _setTitle(title: string) {
    this.echartNetwork.setOption(
      {
        title: {
          text: title
        }
      }
    );
  }

  private _setDefaultParams() {
    // set default network params for performance issue
    const herbCount = this.herbList.length;
    if (herbCount >= 500) {
      this.lengthThreshold = 20;
    } else if (herbCount >= 200) {
      this.lengthThreshold = 15;
    } else if (herbCount >= 100) {
      this.lengthThreshold = 10;
    } else if (herbCount >= 50) {
      this.lengthThreshold = 5;
    }
  }

  initNetworkOption() {
    this.series = {
      name: '',
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 350,
        gravity: 0.1,
        edgeLength: [50, 100]
      },
      categories: [
        {
          name: 'Herb',
          itemStyle: {
            color: '#56cc9d'
          }
        }
      ],
      focusNodeAdjacency: true,
      roam: true,
      symbolSize: 20,
      nodes: [],
      links: [],
      label: {
        normal: {
          show: this.showLabel,
          formatter: (el) => {
            return el.data['English_name'];
          },
          position: 'top',
        }
      },
      lineStyle: {
        normal: {
          width: 6,
          type: 'solid'
        }
      }
    };
    this.echartOptions = {
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
            case 'node':
              return `Herb Id: ${el.data.herb_id}</br>`  +
                `Chinese name: ${el.data.Chinese_name}</br>` +
                `English name: ${el.data.English_name}</br>`;
            case 'edge':
              return `shared disease number: ${el.value}<br/>` +
                `Double click to view more`;
          }
        }
      },
      legend: [{
        top: '20px',
        selectedMode: 'true',
        left: 10,
        orient: 'vertical',
        data: ['Herb']
      }],
      toolbox: {
        show: true,
        feature: {
          dataView: {show: true, readOnly: true},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [this.series],
    };

  }


  getData() { // rest data ---> targetNetworkList
    if (this.echartNetwork !== undefined) {
      this.echartNetwork.showLoading();
    }
    this.rest.getDataList(this.restUrl, 0, 999999)
      .subscribe(data => {
        this.herbList = data['herbs'];
        this.herbDiseaseNetworkList = data['herb_disease_networks'];
        if (this.herbList === undefined) {
          this.echartNetwork.hideLoading();
          this._setTitle('No network data available for this herb.');
        } else {
          this._setDefaultParams();
          // init network
          this.updateNetworkData();
        }
      });
  }

  updateNetworkData() {
    if (this.herbList === undefined) {
      return;
    }
    if (this.echartNetwork !== undefined) {
      this.echartNetwork.showLoading();
    }
    this.series['nodes'] = [];
    this.series['links'] = [];
    const nodeSet = new Set();
    this.herbDiseaseNetworkList.forEach(linkEl => {
      if (linkEl['diseases'].length >= this.lengthThreshold) {
        nodeSet.add(linkEl.first_herb.toString());
        nodeSet.add(linkEl.second_herb.toString());
        this.series['links'].push(
          {
            // source and target used for data view;
            source: 'herb_id:' + linkEl.first_herb.toString() + '-*-'
            + this.herbList.find(el => el.id === linkEl.first_herb).English_name,
            target: 'herb_id:' + linkEl.second_herb.toString() + '-*-'
            + this.herbList.find(el => el.id === linkEl.second_herb).English_name,
            value: linkEl.diseases.length,
            lineStyle: {
              normal: {
                width: 1 + Math.log2(linkEl.diseases.length),
              }
            }
          }
        );
      }
    });
    this.series['nodes'] = this.herbList
      .filter((herbEl: Herb) => nodeSet.has(herbEl.id.toString()))
      .map((herbEl: Herb) => {
        return {
          Chinese_name: herbEl.Chinese_name,
          English_name: herbEl.English_name,
          herb_id: herbEl.id,
          // name 用于和 link中的source 和 target 匹配
          name: 'herb_id:' + herbEl.id.toString() + '-*-' + herbEl.English_name,
          value: 5,
          category: 'Herb',
          itemStyle: {
            color: '#56cc9d',
          }
        };
      });
    this.echartOptions['series'] = [this.series];
    this.echartNetwork.setOption(this.echartOptions);
    this._setTitle(
      `Herb interaction (in term of shared disease numbers)network.` +
      `displayed nodes ${this.series.nodes.length} of ${this.herbList.length}`
    );
    this.echartNetwork.hideLoading();
  }

  showNodeLabel() {
    this.series.label.normal.show = this.showLabel;
    this.echartOptions['series'] = [this.series];
    this.echartNetwork.setOption(this.echartOptions);
  }

  onDbClick(event) {
    switch (event.dataType) {
      case 'node': {
        const selectedHerbId = event.data.herb_id;
        if (selectedHerbId === this.id && this.idType === 'herb') {
          return;
        }
        this.router.navigate(['herb', +(selectedHerbId)]);
        break;
      }
      case 'edge':
        this.globalService.gotoDiseaseList(DiseaseListParamsType.herb_herb, {
          first_herb: event.data.source,
          second_herb: event.data.target,
          top: event.data.value
        });
    }
  }

  gotoHerbHerbSharedTargetTable() {
    let queryParams: object;
    if (this.idType === 'herb') {
      queryParams = {herbId: this.id};
    } else if (this.idType === 'prescription') {
      queryParams = {prescriptionId: this.id};
    }
    this.router.navigate(['network-datatable/herb-herb-shared-disease'], {
      queryParams: queryParams
    });
  }
}
