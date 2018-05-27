import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GlobalService} from '../../../../services/global/global.service';
import {Prescription} from '../../../../yatcm/models/prescription';
import {Herb} from '../../../../yatcm/models/herb';
import {CompoundListParamsType} from '../../../../yatcm/enum/compound-list-param-type.enum';

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  prescription: Prescription;
  mainPrescription: Prescription;
  herbs: Herb[];
  prescriptionId: number | string;
  prescriptionIncludeParams = '&include[]=id&include[]=chinese_name&include[]=english_name' +
    '&exclude[]=*';
  includeParams = '?include[]=herbs.id&include[]=herbs.Chinese_name&include[]=herbs.English_name' +
    '&exclude[]=herbs.*';
  constructor(private rest: RestService,
              private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService) { }

  ngOnInit() {
    console.log('prescription detail init');
    this._getPrescription();
  }

  gotoHerbDetail(hid: number | string) {
    this.router.navigate(['herb', hid]);
  }

  goCompoundList(herbId: number | string) {
    this.globalService.gotoCompoundList(CompoundListParamsType.herb_id, {
      herbId: herbId
    });
  }

  private _getPrescription() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.prescriptionId = +params.get('id');
      this.rest.getData(`prescriptions/${this.prescriptionId}/${this.includeParams}`)
        .subscribe(data => {
          this.prescription = data['prescription'];
          const mainPrescriptionId = +(this.prescription.main_prescription);

          // fetch main_presrciption
          if (mainPrescriptionId > 0) {
            this.rest.getData(`prescriptions/${mainPrescriptionId}/?${this.prescriptionIncludeParams}`)
              .subscribe(mainPrescriptionData => {
                this.mainPrescription = mainPrescriptionData['prescription'];
              });
          }

          // fetch ingredient
          this.rest.getDataList(`herbs/?filter{prescription_set.id}=${this.prescriptionId}` +
            `&include[]=Chinese_name&include[]=English_name&include[]=id&exclude[]=*` +
            `&include[]=compounds.id&exclude[]=compounds.*`, 0, 99999)
            .subscribe(herbsdata => {
              this.herbs = herbsdata['herbs'];
            });
        });
    });
  }


}
