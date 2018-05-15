// import {Component, OnDestroy, OnInit} from "@angular/core";
// import {ActivatedRoute, ParamMap} from "@angular/router";
// import {RestService} from "../../../../services/rest/rest.service";
// import {GlobalService} from "../../../../services/global/global.service";
// import {HerbNetwork} from "../../../../yatcm/models/herb-network/herb-network";
// import {Subscription} from "rxjs/Subscription";
// import {Herb} from "../../../../yatcm/models/herb";
//
// @Component({
//   selector: 'app-prescription-herb-network-graph',
//   templateUrl: './prescription-herb-network-graph.component.html',
//   styleUrls: ['./prescription-herb-network-graph.component.css']
// })
// export class PrescriptionHerbHerbNetworkGraphComponent implements OnInit, OnDestroy {
//   series: any;
//   echartOptions: any;
//   data: any;
//   private echartNetwork;
//   herbList: Herb[];
//   showLabel: false;
//   herbNetworkList: HerbNetwork[];
//   prescriptionIdSubscription: Subscription;
//   prescriptionId: number;
//   includeParams = '&exclude[]=first_herb.*&include[]=first_herb.id' +
//     '&include[]=first_herb.Chinese_name&include[]=first_herb.English_name' +
//     '&exclude[]=second_herb.*&include[]=second_herb.id' +
//     '&include[]=second_herb.Chinese_name&include[]=second_herb.English_name';
//   constructor(private route: ActivatedRoute,
//               private rest: RestService,
//               private globalService: GlobalService) {
//
//   }
//
//   ngOnInit() {
//     this.initNetworkOption();
//     this.prescriptionIdSubscription = this.route.parent.paramMap.subscribe((params: ParamMap) => {
//       this.prescriptionId = +(params.get('id'));
//     });
//   }
//
//   onChartInit(ec) {
//     this.echartNetwork = ec;
//     this.echartNetwork.showLoading();
//   }
//
//   ngOnDestroy() {
//     this.prescriptionIdSubscription.unsubscribe();
//   }
//
//
//   private _setTitle(title: string) {
//     this.echartNetwork.setOption(
//       {
//         title: {
//           text: title
//         }
//       }
//     );
//   }
//
//   initNetworkOption() {
//     this.series = {
//       name: '',
//       type: 'graph',
//       layout: 'force',
//       force: {
//         repulsion: 350,
//         gravity: 0.1,
//         edgeLength: [50, 100]
//       },
//       categories: [
//         {'name': 'Herb'}
//       ],
//       focusNodeAdjacency: true,
//       roam: true,
//       symbolSize: 20,
//       nodes: [],
//       links: [],
//       label: {
//         normal: {
//           show: true,
//           formatter: (el) => {
//             return el.data['English_name'];
//           },
//           position: 'top',
//         }
//       },
//       lineStyle: {
//         normal: {
//           width: 6,
//           type: 'solid'
//         }
//       }
//     };
//     this.echartOptions = {
//       title: {
//         text: '',
//         top: 'bottom',
//         left: 'center',
//         textStyle: {
//           color: '#cdd0d5'
//         }
//       },
//       tooltip: {
//         show: true,
//         formatter: (el) => {
//           switch (el.dataType) {
//             case 'node':
//               return `Herb Id: ${el.data.herb_id}` +
//                 `Chinese name: ${el.data.Chinese_name}</br>` +
//                 `English name: ${el.data.English_name}</br>`;
//             case 'edge':
//               return `shared targets number: ${el.value}`;
//           }
//         }
//       },
//       legend: [{
//         top: '20px',
//         selectedMode: 'true',
//         left: 10,
//         orient: 'vertical',
//         data: ['Herb']
//       }],
//       animationDuration: 3000,
//       animationEasingUpdate: 'quinticInOut',
//       series: [this.series],
//     };
//   }
//
//   getData() {
//     if (this.echartNetwork !== undefined) {
//       this.echartNetwork.showLoading();
//     }
//     this.rest.getDataList(`herbnetworks/?prescription=${this.prescriptionId}${this.includeParams}`, 0, 99999)
//       .subscribe(data => {
//         this.herbList = data['herbs'];
//         this.herbNetworkList = data['herb_networks'];
//         if (this.herbList === undefined) {
//           this.echartNetwork.hideLoading();
//           this._setTitle('No network data avaliable for this prescription');
//         } else {
//           // init network
//           this.updateNetworkData();
//         }
//       });
//   }
//
//   updateNetworkData() {
//     if (this.herbList === undefined) {
//       return;
//     }
//     if (this.echartNetwork !== undefined) {
//       this.echartNetwork.showLoading();
//     }
//     this.series['nodes'] = [];
//     this.series['links'] = [];
//     this.herbNetworkList.forEach(linkEl => {
//       this.series['links'].push(
//         {
//           source: linkEl.first_herb.toString(),
//           target: linkEl.second_herb.toString(),
//           value: linkEl.targets.length,
//           lineStyle: {
//             normal: {
//               width: 1 + Math.log2(linkEl.targets.length),
//             }
//           }
//         }
//       );
//     });
//     this.series['nodes'] = this.herbList
//       .map((herbEl: Herb) => {
//       return {
//         Chinese_name: herbEl.Chinese_name,
//         English_name: herbEl.English_name,
//         herb_id: herbEl.id,
//         name: herbEl.id.toString(),
//         category: 'Herb'
//       };
//       });
//     this.echartOptions['series'] = [this.series];
//     this.echartNetwork.setOption(this.echartOptions);
//     this._setTitle(
//       `Herb interaction (in term of shared target numbers)network.`
//     );
//     this.echartNetwork.hideLoading();
//   }
//
//   showNodeLabel() {
//     this.series.label.normal.show = this.showLabel;
//     this.echartOptions['series'] = [this.series];
//     this.echartNetwork.setOption(this.echartOptions);
//   }
// }
