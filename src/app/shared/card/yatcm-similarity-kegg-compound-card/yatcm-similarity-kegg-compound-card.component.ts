import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {KeggSimilarity} from "../../../yatcm/models/kegg-similarity";

@Component({
  selector: 'app-yatcm-similarity-kegg-compound-card',
  templateUrl: './yatcm-similarity-kegg-compound-card.component.html',
  styleUrls: ['./yatcm-similarity-kegg-compound-card.component.css']
})

export class YatcmSimilarityKeggCompoundCardComponent implements OnInit {
  includeParams = '&include[]=kegg_compound.*' +
    '&include[]=tcm.id&include[]=tcm.english_name' +
    '&include[]=tcm.smiles&include[]=tcm.mol_image&exclude[]=tcm.*';
  keggSimilarities: KeggSimilarity[];
  constructor(public  dialogRef: MatDialogRef<YatcmSimilarityKeggCompoundCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private router: Router) {
  }

  ngOnInit() {
    console.log('yatcm similarity kegg compound card init');
   if (this.data.herbId) {
     this.rest.getDataList(`keggsimilarities/?filter{kegg_compound.pathway}=${this.data.pathwayId}` +
       `&filter{tcm.herb_set.id}=${this.data.herbId}&filter{kegg_compound.kegg_id}=${this.data.keggId}` +
       `${this.includeParams}`,0, 9999)
       .subscribe(herbData => {
         this.keggSimilarities = herbData['kegg_similarities'];
       });
   } else if (this.data.compoundId) {
      // 根据compound id 和 pathway id来获取结构
      this.rest.getDataList(`keggsimilarities/?filter{kegg_compound.pathway}=${this.data.pathwayId}` +
        `&filter{tcm.id}=${this.data.compoundId}` + `${this.includeParams}`)
        .subscribe(data => {
          this.keggSimilarities = data['kegg_similarities'];
        });
    } else if (this.data.prescriptionId) {
      this.rest.getDataList(`keggsimilarities/?filter{kegg_compound.pathway}=${this.data.pathwayId}` +
      `&filter{tcm.herb_set.prescription_set.id}=${this.data.prescriptionId}` +
        `&filter{kegg_compound.kegg_id}=${this.data.keggId}` + `${this.includeParams}`)
        .subscribe(prescriptionData => {
          this.keggSimilarities = prescriptionData['kegg_similarities'];
        });
    }

  }

  kclose() {
    this.dialogRef.close();
  }
}
