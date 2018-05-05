import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {HerbNetwork} from '../../../../yatcm/models/herb-network/herb-network';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Herb} from '../../../../yatcm/models/herb';
import {GlobalService} from '../../../../services/global/global.service';
import {TargetListParamsType} from "../../../../yatcm/enum/target-list-param-type.enum";

@Component({
  selector: 'app-herb-herb-network-graph',
  templateUrl: './herb-herb-network-graph.component.html',
  styleUrls: ['./herb-herb-network-graph.component.css']
})

export class HerbHerbNetworkGraphComponent implements OnInit, OnDestroy {
  herbId: number;
  herbList: Herb[];
  series: any;
  echartOptions: any;
  data: any;
  showLabel = false;
  lengthThreshold = 1; // shared number of targets threshold
  private echartNetwork; // network graph instance
  herbNetworkList: HerbNetwork[]; // full link data
  herbIdSubscription: Subscription;
  includeParmas = '&exclude[]=first_herb.*&include[]=first_herb.id' +
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
    this.herbIdSubscription = this.route.parent.paramMap
      .subscribe((params: ParamMap) => {
      this.herbId = +(params.get('id'));
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
        {'name': 'Herb'}
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
        text: '',
        top: 'bottom',
        left: 'center',
        textStyle: {
          color: '#cdd0d5'
        }
      },
      tooltip: {
        show: true,
        formatter: (el) => {
          switch (el.dataType) {
            case 'node':
              return `Herb Id: ${el.data.herb_id}` +
                `Chinese name: ${el.data.Chinese_name}</br>` +
                `English name: ${el.data.English_name}</br>`;
            case 'edge':
              return `shared targets number: ${el.value}`;
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
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [this.series],
    };

  }


  getData() { // rest data ---> targetNetworkList
    if (this.echartNetwork !== undefined) {
      this.echartNetwork.showLoading();
    }
    this.rest.getDataList(`herbnetworks/herb/?herb_id=${this.herbId}${this.includeParmas}`, 0, 999999)
      .subscribe(data => {
        this.herbList = data['herbs'];
        this.herbNetworkList = data['herb_networks'];
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
    this.herbNetworkList.forEach(linkEl => {
      if (linkEl['targets'].length >= this.lengthThreshold) {
        nodeSet.add(linkEl.first_herb.toString());
        nodeSet.add(linkEl.second_herb.toString());
        this.series['links'].push(
          {
            source: linkEl.first_herb.toString(),
            target: linkEl.second_herb.toString(),
            value: linkEl.targets.length,
            lineStyle: {
              normal: {
                width: 1 + Math.log2(linkEl.targets.length),
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
          name: herbEl.id.toString(),
          category: 'Herb'
        };
      });
    this.echartOptions['series'] = [this.series];
    this.echartNetwork.setOption(this.echartOptions);
    this._setTitle(
      `Herb interaction (in term of shared target numbers)network.` +
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
    console.log(event); // todo delete
    switch (event.dataType) {
      case 'node': {
        const selectedHerbId = event.data.herb_id;
        if (selectedHerbId === this.herbId) {
          return;
        }
        this.router.navigate(['herb', +(selectedHerbId)]);
        break;
      }
      case 'edge':
        this.globalService.gotoTargetList(TargetListParamsType.herb_herb, {
          first_herb: event.data.source,
          second_herb: event.data.target,
          top: event.data.value
        });
    }
  }

  gotoNetworkTable() {
    this.router.navigate(['network-datatable/herb-herb-network-data'], {
      queryParams: {
        herbId: this.herbId
      }
    });
  }
}
