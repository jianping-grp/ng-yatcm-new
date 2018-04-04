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
  restUrl: string;
  keggId: string;
  constructor(private rest: RestService,
              public  dialogRef: MatDialogRef<KeggproteinToTargetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {

  }

  ngOnInit() {
    console.log('kegg protein to target');
    this.keggId = this.data.keggId;
    if (this.data.herbId) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.pathwayId}` +
        `&filter{compounds.herb_set.id}=${this.data.herbId}` +
        `&filter{keggprotein_set.kegg_id}=${this.data.keggId}`;
      this._getTargets(this.restUrl);
    } else if (this.data.prescriptionId) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.pathwayId}` +
        `&filter{compounds.herb_set.prescription_set.id}=${this.data.prescriptionId}` +
        `&filter{keggprotein_set.kegg_id}=${this.data.keggId}`;
      this._getTargets(this.restUrl);
    } else if (this.data.compoundId) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.pathwayId}` +
        `&filter{compounds.id}=${this.data.compoundId}` +
        `&filter{keggprotein_set.kegg_id}=${this.data.keggId}`;
      this._getTargets(this.restUrl);
    } else if (this.data.targetId) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.pathwayId}` +
        `&filter{id}=${this.data.targetId}` + `&filter{keggprotein_set.kegg_id}=${this.data.keggId}`;
      this._getTargets(this.restUrl);
    } else if (this.data.diseaseId) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.pathwayId}` +
        `&filter{disease_set.id}=${this.data.diseaseId}` +
        `&filter{keggprotein_set.kegg_id}=${this.data.keggId}`;
      this._getTargets(this.restUrl);
    }
  }

  private _getTargets(url: string) {
    this.rest.getDataList(url, 0, 99999)
      .subscribe(data => {
        this.targets = data['targets'];
      });
  }

  kclose() {
    this.dialogRef.close();
  }
}
