import {Component, Inject, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Compound} from '../../../yatcm/models/compound';

@Component({
  selector: 'app-compound-card',
  templateUrl: './compound-card.component.html',
  styleUrls: ['./compound-card.component.css']
})
export class CompoundCardComponent implements OnInit {
  compound: Compound;
  constructor(private rest: RestService,
              public dialogRef: MatDialogRef<CompoundCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.rest.getDataList(`compounds/?filter{id}=${this.data.compoundId}`, 0, 999)
      .subscribe(data => {
        this.compound = data['compounds'][0];
      });
  }

}
