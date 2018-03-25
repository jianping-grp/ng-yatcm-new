import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Herb} from '../../../../yatcm/models/herb';
import {Prescription} from '../../../../yatcm/models/prescription';
import {Compound} from '../../../../yatcm/models/compound';

@Component({
  selector: 'app-herb-network-data',
  templateUrl: './herb-network-data.component.html',
  styleUrls: ['./herb-network-data.component.css']
})

export class HerbNetworkDataComponent implements OnInit {
  herb: Herb | null;
  prescriptions: Prescription[] | null;
  compounds: Compound[] | null;
  herbId: number;
  echart: any;
  categoryList = '';
  chartOptions = {
    title: {
      text: 'Herb Network',
      top: 'top',
      left: 'center',
    },
    tooltip: {},
    legend: [{
      formatter: name,
      tooltip: {
        show: true
      },
        selectedMode: 'false',
        bottom: 20,
        data: ['Prescription', 'Herb', 'compound'],
      // data: ['国务院办公厅', '国务院组成部门', '国务院直属特设机构', '国务院直属机构', '国务院办事机构', '国务院直属事业单位', '国务院部委管理的国家局', '国务院议事协调机构']

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
      name: 'herb',
      type: 'graph',
      layout: 'force',

      force: {
        repulsion: 50
      },
      data: [{
        'name': 'herb1',
        'category': 'herb',
        'symbolSize': 40,
        'draggable': 'true',
        'value': 8
      }, {
        'name': 'prescription1',
        'category': 'prescription',
        'symbolSize': 40,
        'draggable': 'true',
        'value': 8
      }, {
        'name': 'compound1',
        'category': 'compound',
        'symbolSize': 40,
        'draggable': 'true',
        'value': 8
      }, {
        'name': 'compound2',
        'category': 'compound',
        'symbolSize': 40,
        'draggable': 'true',
        'value': 8
      }],
      links: [{
        'source': 'herb1',
        'target': 'compound1'
      }, {
        'source': 'prescription1',
        'target': 'herb1'
      }
      ],
      categories: [
        {'name': 'herb'},
        {'name': 'prescription'},
        {'name': 'compound'},
      ],
      focusNodeAdjacency: true,
      roam: true,
      label: {
        normal: {
          show: false,
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


  constructor(private route: ActivatedRoute,
              private rest: RestService) {
  }

  ngOnInit() {
    this.route.parent.paramMap.map((params: ParamMap) => {
     this.herbId = +params.get('id');
    });
  }

  getData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    const restUrl = `herbs/?filter{id}=${this.herbId}&include[]=prescription_set.id&include[]=prescription_set.chinese_name ` +
      `&include[]=prescription_set.pinyin_name&exclude[]=prescription_set.*` +
      `&include[]=compounds.id&include[]=compounds.english_name&exclude[]=compounds.*`;
    this.rest.getDataList(restUrl, 0, 9999999, '')
      .subscribe(data => {
        this.herb = data['herbs'][0];
        this.prescriptions = this.herb.prescription_set;
        this.compounds = this.herb.compounds;
      });
  }

  dataToSeries() {

  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
    this.getData();
  }
}
