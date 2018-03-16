import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {KtCircleCanvas} from '../../../../yatcm/models/canvas/kt-circle-canvas';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import * as $ from 'jquery';

@Component({
  selector: 'app-kegg-map-canvas',
  templateUrl: './kegg-map-canvas.component.html',
  styleUrls: ['./kegg-map-canvas.component.css']
})

export class KeggMapCanvasComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('canvas') canvas: ElementRef;
  // @ViewChild('canvas_rank3') canvas_rank3: ElementRef;
  @Input() circleCanvasObjs: KtCircleCanvas[];
  private windowResizeSubscription: Subscription;

  private canvasWidth: number;
  private canvasHeight: number;
  x = 144 * 46.5 / 285;
  y = 336 * 86 / 530;
  constructor(private _elementRef: ElementRef) {
  }


  ngOnInit() {
    const canvasEl = this.canvas.nativeElement;
    const cxt: CanvasRenderingContext2D = canvasEl.getContext('2d');
    const img = new Image();
    // img.src = 'http://www.kegg.jp/kegg/pathway/map/map00250.png';
    // cxt.drawImage(img, 0, 0);

    cxt.fillStyle = '#FF0000';
    cxt.beginPath();
    cxt.arc(this.x, this.y,2,0,Math.PI*2,true);
    cxt.arc(245, this.y,2,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();


  }

  ngOnChanges(changes: SimpleChanges) {

  }
  ngAfterViewInit() {

  }

//   // 绘制排名第一的圆
//   private _draw_rank(canvas: any, title: string, content: string, x: number,
//                      y: number, radius: number, fillColor: string, fontSize: number,
//                      width?: number, height?: number, heightRatio?, widthRatio?) {
//     // 获取上下文
//     const canvasEl: HTMLCanvasElement = canvas.nativeElement;
//
//     if (height && width) {
//       canvasEl.width = width;
//       canvasEl.height = height;
//       x = x * widthRatio;
//       y = y * heightRatio;
//       if (widthRatio < heightRatio) {
//         radius = radius * widthRatio;
//       } else {
//         radius = radius * heightRatio;
//       }
//     }
//
//     const ctx: CanvasRenderingContext2D = canvasEl.getContext('2d');
//     ctx.beginPath();
//
//     const grd = ctx.createLinearGradient(x, y - radius, x, y + radius);
//     grd.addColorStop(0, fillColor);
//     grd.addColorStop(1, 'white');
//
// // 填充渐变
//     ctx.fillStyle = grd;
//
//     const circle = {
//       x: x, // 圆心的X轴坐标值
//       y: y, // 圆心的x轴坐标
//       r: radius // 半径
//     };
//
//     ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);
//     ctx.fill();
//
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.font = `200 ${fontSize}px Arial`;
//     ctx.fillStyle = '#FFFFFF'; // text color
//
//     ctx.fillText(title, x, y - 10);
//     const subFontSize = fontSize - 2;
//     ctx.font = `200 ${subFontSize}px Arial`;
//     ctx.fillText(content, x, y + 5);
//
//
//   }


}
