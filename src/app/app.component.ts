import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'yatcm';
  loadingStatus: boolean;
  loadingStatus$: Observable<boolean>;
  screenHeight: string;



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


    onclick(event) {
      console.log('event:', event);
    }


  }
