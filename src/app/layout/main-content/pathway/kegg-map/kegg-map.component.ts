import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';
import {MatDialog} from '@angular/material';
import {YatcmSimilarityKeggCompoundCardComponent} from '../../../../shared/card/yatcm-similarity-kegg-compound-card/yatcm-similarity-kegg-compound-card.component';
import {MappingKeggCpds} from '../../../../yatcm/models/kegg-pathway-map/mapping-kegg-cpds';

@Component({
  selector: 'app-kegg-map',
  templateUrl: './kegg-map.component.html',
  styleUrls: ['./kegg-map.component.css']
})

export class KeggMapComponent implements OnInit {
  displayType: string;
  pathwayId: number | string;
  compoundId: number | string;
  herbId: number | string;
  prescriptionId: number | string;
  keggPathway: KeggPathway;
  mappingKeggCpds: MappingKeggCpds[] | null;
  constructor(private rest: RestService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    console.log('kegg map init');
    this._getData();

  }

  private _getData() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.pathwayId = +params.get('pathwayId');
      // this.compoundId = +params.get('compoundId');
      // fetch pathway information
      this.rest.getData(`keggpathways/${this.pathwayId}/`)
        .subscribe(data => {
          this.keggPathway = data['kegg_pathway'];
        });

      // 根据不同的参数， 获取map信息
      if (params.has('compoundId')) {
        this.displayType = 'compound';
        this.compoundId = +params.get('compoundId');
        const body = {cpd_id: this.compoundId, kegg_pathway_id: this.pathwayId};
        // fetch pathway map information
        this.rest.postData(`compounds/cpd_kegg_map/`, body)
          .subscribe(mapdata => {
            this.mappingKeggCpds = mapdata['mapping_kegg_cpds'];
          });
      } else if (params.has('herbId')) {
        this.displayType = 'herb';
        this.herbId = +params.get('herbId');
        const body = {herb_id: this.herbId, kegg_pathway_id: this.pathwayId};
        this.rest.postData(`herbs/cpd_kegg_map/`, body)
          .subscribe(herbMapData => {
            this.mappingKeggCpds = herbMapData['mapping_kegg_cpds'];
          });
      } else if (params.has('prescriptionId')) {
        this.displayType = 'prescription';
        this.prescriptionId = +params.get('prescriptionId');
        const body = {prescription_id: this.prescriptionId, kegg_pathway_id: this.pathwayId};
        this.rest.postData(`prescriptions/cpd_kegg_map/`, body)
          .subscribe(prescriptionMapData => {
          this.mappingKeggCpds = prescriptionMapData['mapping_kegg_cpds'];
        });
      }
    });
  }

  openCompoundDialog(compoundId: number): void {
    this.dialog.open(YatcmSimilarityKeggCompoundCardComponent, {
      width: '680px',
      data: {
        compoundId: compoundId,
        pathwayId: this.pathwayId
      }
    });
  }

  openHerbDialog(keggId: string): void {
    this.dialog.open(YatcmSimilarityKeggCompoundCardComponent, {
      width: '680px',
      data: {
        herbId: this.herbId,
        keggId: keggId,
        pathwayId: this.pathwayId
      }
    });
  }

  openPrescriptionDialog(keggId: string): void {
    this.dialog.open(YatcmSimilarityKeggCompoundCardComponent, {
      width: '680px',
      data: {
        prescriptionId: this.prescriptionId,
        pathwayId: this.pathwayId,
        keggId: keggId
      }
    });
  }

}
