import {Component, Inject, OnInit} from '@angular/core';
import {Target} from '../../../yatcm/models/target';
import {RestService} from '../../../services/rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-keggprotein-to-target',
  templateUrl: './keggprotein-to-target.component.html',
  styleUrls: ['./keggprotein-to-target.component.css']
})
export class KeggproteinToTargetComponent implements OnInit {
  targets: Target[];
  constructor(private rest: RestService,
              public  dialogRef: MatDialogRef<KeggproteinToTargetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {

  }

  ngOnInit() {

  }
}
