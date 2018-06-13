import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {Assay} from '../../../yatcm/models/assay';

@Component({
  selector: 'app-assay-card',
  templateUrl: './assay-card.component.html',
  styleUrls: ['./assay-card.component.css']
})
export class AssayCardComponent implements OnInit {
  assay: Assay | null;
  constructor(
    public  dialogRef: MatDialogRef<AssayCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rest: RestService,
    private router: Router) { }

  ngOnInit() {
    this.rest.getDataList(`assays/?filter{id}=${this.data.assayId}`)
      .subscribe(data => {
      this.assay = data['assays'][0];
      });
    }
}
