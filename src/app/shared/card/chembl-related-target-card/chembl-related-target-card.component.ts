import {Component, Inject, OnInit} from '@angular/core';
import {Chemblrelatedtarget} from '../../../yatcm/models/chemblrelatedtarget';
import {RestService} from '../../../services/rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-chembl-relatd-target-card',
  templateUrl: './chembl-related-target-card.component.html',
  styleUrls: ['./chembl-related-target-card.component.css']
})
export class ChemblRelatedTargetCardComponent implements OnInit {
  target: Chemblrelatedtarget | null;
  constructor(private rest: RestService,
              public dialogRef: MatDialogRef<ChemblRelatedTargetCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this._getTarget(this.data.chemblId,  this.data.activityId);
  }

  private _getTarget(chemblId: number | string, activityId: number | string) {
    this.rest.getDataList(`chemblrelatedtargets/?filter{chembl_set.id}=${chemblId}` +
      `&filter{chembl_set.activities.id}=${activityId}`, 0, 9999)
      .subscribe(data => {
        this.target = data['ch_embl_related_targets'][0];
      });
  }
}
