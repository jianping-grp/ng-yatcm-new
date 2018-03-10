import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {Doc} from '../../../yatcm/models/doc';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.css']
})
export class DocCardComponent implements OnInit {
  doc: Doc | null;

  constructor(public  dialogRef: MatDialogRef<DocCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private router: Router) {
  }
  ngOnInit() {
    this.rest.getDataList(`docs/?filter{id}=${this.data.docId}`, 0, 9999)
      .subscribe(data => {
        this.doc = data['docs'][0];
      });
  }
}
