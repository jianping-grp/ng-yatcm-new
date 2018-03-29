import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';
import {MatDialog} from '@angular/material';
import {YatcmSimilarityKeggCompoundCardComponent} from '../../../../shared/card/yatcm-similarity-kegg-compound-card/yatcm-similarity-kegg-compound-card.component';
import {MappingKeggCpd} from '../../../../yatcm/models/kegg-pathway-map/mapping-kegg-cpd';
import {MappingKeggTgt} from '../../../../yatcm/models/kegg-pathway-map/mapping-kegg-tgt';

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
  cpdUrl: string;
  tgtUrl: string;
  body: object;
  prescriptionId: number | string;
  keggPathway: KeggPathway;
  mappingKeggCpds: MappingKeggCpd[] | null;
  mappingKeggTgts: MappingKeggTgt[] | null;
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
      // fetch pathway information
      this.rest.getData(`keggpathways/${this.pathwayId}/`)
        .subscribe(data => {
          this.keggPathway = data['kegg_pathway'];
        });

      // 根据不同的参数， 获取map信息
      if (params.has('compoundId')) {
        this.displayType = 'compound';
        this.compoundId = +params.get('compoundId');
        this.cpdUrl = `compounds/cpd_kegg_map/`;
        this.tgtUrl = `compounds/tgt_kegg_map/`;
        this.body = {cpd_id: this.compoundId, kegg_pathway_id: this.pathwayId};
      } else if (params.has('herbId')) {
        this.displayType = 'herb';
        this.herbId = +params.get('herbId');
        this.cpdUrl = `herbs/cpd_kegg_map/`;
        this.tgtUrl = `herbs/tgt_kegg_map/`;
        this.body = {herb_id: this.herbId, kegg_pathway_id: this.pathwayId};
      } else if (params.has('prescriptionId')) {
        this.displayType = 'prescription';
        this.prescriptionId = +params.get('prescriptionId');
        this.cpdUrl = `prescriptions/cpd_kegg_map/`;
        this.tgtUrl = `prescriptions/tgt_kegg_map/`;
        this.body = {prescription_id: this.prescriptionId, kegg_pathway_id: this.pathwayId};
      } else {
        // todo add target and disease
      }
      this._fetchMappingKeggCpds(this.cpdUrl, this.body);
      this._fetchMappingKeggTgts(this.tgtUrl, this.body);
    });
  }

  // fetch compound mapping information
  private _fetchMappingKeggCpds(url: string, body: object) {
    this.rest.postData(url, body).subscribe(data => {
      this.mappingKeggCpds = data['mapping_kegg_cpds'];
    });
  }

  // fetch target mapping information
  private _fetchMappingKeggTgts(url: string, body: object) {
    this.rest.postData(url, body).subscribe(data => {
      this.mappingKeggTgts = data['mapping_kegg_tgts'];
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

  stringToNumber(string: string): number {
    console.log( parseInt(string, 10) - 22);
    return  parseInt(string, 10) - 22;
  }
}
