import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from './services/global/global.service';
import {HerbListParamsType} from './yatcm/enum/herb-list-param-type.enum';
import {Observable} from 'rxjs/Observable';
import {PrescriptionListParamsType} from './yatcm/enum/prescription-list-param-type.enum';
import {CompoundListParamsType} from './yatcm/enum/compound-list-param-type.enum';
import {PathwayListParamsType} from './yatcm/enum/pathway-list-param-type.enum';
import {TargetListParamsType} from './yatcm/enum/target-list-param-type.enum';
import {DiseaseListParamsType} from './yatcm/enum/disease-list-param-type.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'yatcm';
  loadingStatus: boolean;
  loadingStatus$: Observable<boolean>;
  screenHeight: string;
  cytograph: any;
  graphData = {
    nodes: [
      {data: {id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'triangle', group: 0, size: 40}},
      {data: {id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse', group: 1, size: 50}},
      {data: {id: 'k', name: 'Kramer', faveColor: '#86B342', faveShape: 'octagon', group: 3, size: 40}},
      {data: {id: 'g', name: 'George', faveColor: '#F5A45D', faveShape: 'rectangle', group: 2, size: 100}}
    ],
    edges: [
      {data: {source: 'j', target: 'e', faveColor: '#6FB1FC'}},
      {data: {source: 'j', target: 'k', faveColor: '#6FB1FC'}},
      {data: {source: 'j', target: 'g', faveColor: '#6FB1FC'}},

      {data: {source: 'e', target: 'j', faveColor: '#EDA1ED'}},
      {data: {source: 'e', target: 'k', faveColor: '#EDA1ED'}},

      {data: {source: 'k', target: 'j', faveColor: '#86B342'}},
      {data: {source: 'k', target: 'e', faveColor: '#86B342'}},
      {data: {source: 'k', target: 'g', faveColor: '#86B342'}},

      {data: {source: 'g', target: 'j', faveColor: '#F5A45D'}}
    ]
  };

  // options = {
  //   groups: {
  //     0: {
  //       font: {
  //         /*size: 50,*/ // px
  //         face: 'Arimo',
  //         background: 'none',
  //         strokeWidth: 0, // px
  //         strokeColor: '#ffffff',
  //         align: 'center'
  //       },
  //       size: 50,
  //       shape: 'square',
  //       color: 'lime',
  //       border: 2,
  //     },
  //     1: {
  //       font: {
  //         color: 'rgba(0,0,0,1)',
  //
  //         face: 'Arimo',
  //         background: 'none',
  //         strokeWidth: 2, // px
  //         strokeColor: '#fff',
  //         align: 'center'
  //       },
  //       size: 50,
  //       // shape: 'square',
  //       shape: 'triangle',
  //       /*color: 'rgba(238,99,99,1)',*/
  //       // color: {background:'#F03967', border:'#713E7F'}
  //       color: 'rgba(251,0,2,1)'
  //     },
  //     2: {
  //       color: 'rgba(255,160,122,1)'
  //     },
  //     3: {
  //       size: 40,
  //       shape: 'dot',
  //       color: 'rgba(92,172,238,1)'
  //       /*color:'rgba(255,255,0,1)'*/
  //     },
  //     4: {
  //       size: 40,
  //       shape: 'diamond',
  //       color: {background: 'pink', border: 'purple'}
  //       /*color:'rgba(92,172,238,1)'*/
  //     },
  //     9: {
  //       color: 'rgba(255,160,122,1)'
  //     }
  //   },
  //   edges: {
  //     arrows: {
  //       middle: {
  //         enabled: true,
  //         scaleFactor: 2
  //       }
  //     },
  //     arrowStrikethrough: true,
  //     color: {
  //       color: '#3399CC',
  //       highlight: '#CC3366',
  //       hover: '#CC3366',
  //       opacity: 0.5
  //     },
  //     width: 2.0,
  //     hoverWidth: 5.0,
  //     smooth: {
  //       enabled: true,
  //       type: 'dynamic',
  //       roundness: 0.5
  //     }
  //   },
  //   layout: {
  //     randomSeed: 34
  //   },
  //   physics: {
  //     forceAtlas2Based: {
  //       gravitationalConstant: -20,
  //       centralGravity: 0.005,
  //       springLength: 240,
  //       springConstant: 0.205,
  //       avoidOverlap: 0.3
  //     },
  //     maxVelocity: 148,
  //     solver: 'forceAtlas2Based',
  //     timestep: 0.22,
  //     stabilization: {
  //       enabled: true,
  //       iterations: 50,
  //       updateInterval: 25
  //     }
  //   },
  //   interaction: {
  //     navigationButtons: true,
  //     keyboard: true,
  //     hover: true,
  //     hideEdgesOnDrag: true
  //   },
  //   configure: {
  //     enabled: true,
  //
  //     filter: function (option, path) {
  //       //console.log(path);
  //
  //       if (path.indexOf('physics') !== -1) {
  //         return true;
  //       }
  //       if (path.indexOf('arrows') !== -1) {
  //         return true;
  //       }
  //       if (path.indexOf('dashes') !== -1 || option == 'dashes') {
  //         return true;
  //       }
  //       if (path.indexOf('smooth') !== -1) {
  //         return true;
  //       }
  //       if (path.indexOf('nodes') !== -1 && path.indexOf('font') !== -1) {
  //         return true;
  //       }
  //       return false;
  //     },
  //
  //     //filter: 'nodes,edges',
  //     container: document.getElementById('ctrlPannel'),
  //     showButton: false
  //   },
  //   //   manipulation: {
  //   //     addNode: function (data, callback) {
  //   //       // filling in the popup DOM elements
  //   //       document.getElementById('operation').innerHTML = 'Add Node';
  //   //       document.getElementById('node-id').value = data.id;
  //   //       document.getElementById('node-label').value = data.label;
  //   //       document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
  //   //       document.getElementById('cancelButton').onclick = clearPopUp.bind();
  //   //       document.getElementById('network-popUp').style.display = 'block';
  //   //     },
  //   //     editNode: function (data, callback) {
  //   //       // filling in the popup DOM elements
  //   //       document.getElementById('operation').innerHTML = 'Edit Node';
  //   //       document.getElementById('node-id').value = data.id;
  //   //       document.getElementById('node-label').value = data.label;
  //   //       document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
  //   //       document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
  //   //       document.getElementById('network-popUp').style.display = 'block';
  //   //     },
  //   //     addEdge: function (data, callback) {
  //   //       if (data.from == data.to) {
  //   //         var r = confirm('Do you want to connect the node to itself?');
  //   //         if (r == true) {
  //   //           callback(data);
  //   //         }
  //   //       } else {
  //   //         callback(data);
  //   //       }
  //   //     }
  //   //   }
  //   // };
  //
    constructor(private globalService: GlobalService,
                private cd: ChangeDetectorRef,
                private router: Router) {
      this.globalService.loadingStatus$.subscribe(status => {
        this.loadingStatus = status;
        this.cd.detectChanges();
      });
    }

    ngOnInit() {
      this.getScreenHeight();
    }

    getScreenHeight() {
      const y = window.innerHeight - 204; // 204 = nav.height(64) + foot.height(80) + margin-top(60);
      this.screenHeight = y.toString() + 'px';
    }

    goHome() {
      this.router.navigate(['home']);
    }
    goHerbList() {
      this.globalService.gotoHerbList(HerbListParamsType.herb);
    }

    goPrescriptionList() {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.prescription);
    }

    goCompundList() {
      this.globalService.gotoCompoundList(CompoundListParamsType.compound);
    }

    goPathwayList() {
      this.globalService.gotoPathwayList(PathwayListParamsType.pathway);
    }

    goTargetList() {
      this.globalService.gotoTargetList(TargetListParamsType.target);
    }

    goDiseaseList() {
      this.globalService.gotoDiseaseList(DiseaseListParamsType.disease);
    }

    ngAfterViewInit() {
      // if (this.cytograph.cy) {
      //   const cyLayer = this.cytograph.cy.cyCanvas();
      //   const cnv: HTMLCanvasElement = cyLayer.getCanvas();
      //   const ctx: CanvasRenderingContext2D = cnv.getContext('2d');
      //   // ...
      //   this.cytograph.cy.on('render cyCanvas.resize', function(evt, src) {
      //     // 'this' is now 'cy' inside this callback function
      //     cyLayer.resetTransform(ctx);
      //     cyLayer.clear(ctx);
      //     ctx.fillStyle = '#ff00ff';
      //     //ctx.fillRect(0, 0, 100, 100); // Top left corner
      //     cyLayer.setTransform(ctx);
      //
      //     const width = cnv.width;
      //     const height = cnv.height;
      //     const data = Array(width * height);
      //
      //     // Draw model elements
      //     this.nodes().forEach(function(node) {
      //       const pos = node.position();
      //       // Do something with canvas at or around the node's position
      //       ctx.fillRect(pos.x - 25, pos.y - 25, 50, 50); // At node position (bisection point of 50x50 rectangle)
      //     });
      //   });
      // }
    }

    onclick(event) {
      console.log('event:', event);
    }


  }
