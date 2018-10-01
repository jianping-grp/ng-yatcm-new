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
      {data: {id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'triangle'}},
      {data: {id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse'}},
      {data: {id: 'k', name: 'Kramer', faveColor: '#86B342', faveShape: 'octagon'}},
      {data: {id: 'g', name: 'George', faveColor: '#F5A45D', faveShape: 'rectangle'}}
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
