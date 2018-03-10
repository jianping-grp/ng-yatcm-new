import {Injectable, NgZone, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {HerbListParamsType} from "../../yatcm/enum/herb-list-param-type.enum";
import {PrescriptionListParamsType} from "../../yatcm/enum/prescription-list-param-type.enum";
import {CompoundListParamsType} from "../../yatcm/enum/compound-list-param-type.enum";
import {PathwayListParamsType} from "../../yatcm/enum/pathway-list-param-type.enum";
import {TargetListParamsType} from "../../yatcm/enum/target-list-param-type.enum";

declare const JSApplet: any;

@Injectable()
export class GlobalService implements OnInit {
  // jsme
  JSMEApplet$ = new Subject<any>();

  constructor(private zone: NgZone,
              private router: Router) {
    this.zone.runOutsideAngular(() => {
      window['jsmeOnload'] = () => {
        console.log('JSME init');
        this.JSMEApplet$.next(JSApplet);
      };
    });
  }

  // global loading
  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();

  setLoading(status: boolean): void {
    this._globalLoading.next(status);
  }

  ngOnInit() { }

  gotoHerbList(paramsType: HerbListParamsType, params?: any) {
    const queryParams = {paramsType: paramsType};
      Object.assign(queryParams, params);
    this.router.navigate(['herb'], {
      queryParams: queryParams
    });
  }

  gotoPrescriptionList(paramsType: PrescriptionListParamsType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['prescription'], {
      queryParams: queryParams
    });
  }

  gotoCompoundList(paramsType: CompoundListParamsType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['compound'], {
      queryParams: queryParams
    });
  }

  gotoPathwayList(paramsType: PathwayListParamsType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['pathway'], {
      queryParams: queryParams
    });
  }

  gotoTargetList(paramsType: TargetListParamsType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['target'], {
      queryParams: queryParams
    });
  }
}
