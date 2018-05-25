import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {GlobalService} from '../../../services/global/global.service';
import {Router} from '@angular/router';
import {TargetListParamsType} from '../../../yatcm/enum/target-list-param-type.enum';
import {PathwayListParamsType} from '../../../yatcm/enum/pathway-list-param-type.enum';

@Component({
  selector: 'app-select-target-or-pathway-list',
  templateUrl: './select-target-or-pathway-list.component.html',
  styleUrls: ['./select-target-or-pathway-list.component.css']
})
export class SelectTargetOrPathwayListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectTargetOrPathwayListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private globalSerive: GlobalService,
              private router: Router
          ) { }


  ngOnInit() {
  }

  gotoTargetList() {
    this.globalSerive.gotoTargetList(TargetListParamsType.herb_herb, {
      first_herb: this.data.first_herb,
      second_herb: this.data.second_herb,
      top: this.data.top
    });
  }

  gotoPathwayList() {
    this.router.navigate(['network-datatable/pathway-list'], {
      queryParams: {
        first_herb: this.data.first_herb,
        second_herb: this.data.second_herb
      }
    })
  }

  kclose() {
    this.dialogRef.close();
  }
}
