import {Component, Inject, OnInit} from '@angular/core';
import {Target} from '../../../yatcm/models/target';
import {RestService} from '../../../services/rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


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
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    console.log('kegg protein to target');
    this.keggId = this.data.kegg_id;
    if (this.data.herbId) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.kegg_pathway_id}` +
        `&filter{keggprotein_set.kegg_id}=${this.keggId}` +
        `&filter{compounds.herb_set.id}=${this.data.herbId}`;
      this._getTargets(this.restUrl);
    } else if (this.data.prescription_id) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.kegg_pathway_id}` +
        `&filter{keggprotein_set.kegg_id}=${this.keggId}` +
        `&filter{compounds.herb_set.prescription_set.id}=${this.data.prescription_id}`;
      this._getTargets(this.restUrl);
    } else if (this.data.cpd_id) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.kegg_pathway_id}` +
        `&filter{keggprotein_set.kegg_id}=${this.keggId}` +
        `&filter{compounds.id}=${this.data.cpd_id}`;
      this._getTargets(this.restUrl);
    } else if (this.data.target_id) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.kegg_pathway_id}` +
        `&filter{keggprotein_set.kegg_id}=${this.keggId}` +
        `&filter{id}=${this.data.target_id}`;
      this._getTargets(this.restUrl);
    } else if (this.data.disease_id) {
      this.restUrl = `targets/?filter{keggprotein_set.pathways.id}=${this.data.kegg_pathway_id}` +
        `&filter{keggprotein_set.kegg_id}=${this.keggId}` +
        `&filter{ttddisease_set.id}=${this.data.disease_id}`;
      this._getTargets(this.restUrl);
    } else if (this.data.first_herb_id) {
      this.restUrl = `targets/herb_herb_special_target_object/?first_herb_id=${this.data.first_herb_id}` +
        `&second_herb_id=${this.data.second_herb_id}` +
        `&kegg_pathway_id=${this.data.kegg_pathway_id}` +
        `&kegg_id=${this.keggId}`;
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
