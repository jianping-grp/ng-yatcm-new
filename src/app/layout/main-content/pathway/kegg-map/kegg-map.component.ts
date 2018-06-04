import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';
import {MatDialog} from '@angular/material';
import {
  YatcmSimilarityKeggCompoundCardComponent
} from '../../../../shared/card/yatcm-similarity-kegg-compound-card/yatcm-similarity-kegg-compound-card.component';
import {MappingKeggCpd} from '../../../../yatcm/models/kegg-pathway-map/mapping-kegg-cpd';
import {MappingKeggTgt} from '../../../../yatcm/models/kegg-pathway-map/mapping-kegg-tgt';
import {KeggproteinToTargetComponent} from '../../../../shared/card/keggprotein-to-target/keggprotein-to-target.component';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-kegg-map',
  templateUrl: './kegg-map.component.html',
  styleUrls: ['./kegg-map.component.css']
})

export class KeggMapComponent implements OnInit, OnDestroy {
  tooltipWords = 'Click to view more';
  displayType: string;
  pathwayId: number | string;
  compoundId: number | string;
  herbId: number | string;
  targetId: number | string;
  diseaseId: number | string;
  isLoading = false;
  isLoadingError = false;
  keggId: string;
  cpdUrl: string;
  tgtUrl: string;
  body: object;
  firstHerbId: number;
  secondHerbId: number;
  pathwayIdSubsrciption: Subscription;
  keggTgtSubscription: Subscription;
  keggCpdSubscription: Subscription;
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

  ngOnDestroy() {
    this.pathwayIdSubsrciption.unsubscribe();
    this.keggTgtSubscription.unsubscribe();
    this.keggCpdSubscription.unsubscribe();
  }

  private _getData() {
    this.pathwayIdSubsrciption = this.route.queryParamMap.subscribe((params: ParamMap) => {
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
        this.body = {cpd_id: this.compoundId, kegg_pathway_id: this.pathwayId};
        if (params.has('keggId')) {
          this.keggId = params.get('keggId');
          // 通过keggId compoundId, pathwayId 获取唯一的坐标
          this.rest.postData(`compounds/cpd_kegg_map/`, this.body).subscribe(data => {
            this.mappingKeggCpds = [];
            const mapingKeggCompounds = data['mapping_kegg_cpds'];
            this.mappingKeggCpds.push(mapingKeggCompounds.find(el => el.keggcompound_keggid === this.keggId));
          });
        } else {
          this._fetchMappingKeggTgts(`compounds/tgt_kegg_map/`, this.body);
          this._fetchMappingKeggCpds(`compounds/cpd_kegg_map/`, this.body);
        }
      } else if (params.has('herbId')) {
        this.displayType = 'herb';
        this.herbId = +params.get('herbId');
        this.body = {herb_id: this.herbId, kegg_pathway_id: this.pathwayId};
        this._fetchMappingKeggTgts(`herbs/tgt_kegg_map/`, this.body);
        this._fetchMappingKeggCpds(`herbs/cpd_kegg_map/`, this.body);
      } else if (params.has('prescriptionId')) {
        this.displayType = 'prescription';
        this.prescriptionId = +params.get('prescriptionId');
        this.body = {prescription_id: this.prescriptionId, kegg_pathway_id: this.pathwayId};
        this._fetchMappingKeggTgts(`prescriptions/tgt_kegg_map/`, this.body);
        this._fetchMappingKeggCpds(`prescriptions/cpd_kegg_map/`, this.body);
      } else if (params.has('targetId')) {
        this.displayType = 'target';
        this.targetId = +params.get('targetId');
        this.body = {target_id: this.targetId, kegg_pathway_id: this.pathwayId};
        this._fetchMappingKeggTgts(`targets/tgt_kegg_map/`, this.body);
      } else if (params.has('diseaseId')) {
        this.displayType = 'disease';
        this.diseaseId = +params.get('diseaseId');
        this.body = {disease_id: this.diseaseId, kegg_pathway_id: this.pathwayId};
        this._fetchMappingKeggTgts(`ttddisease/tgt_kegg_map/`, this.body);
      } else if (params.has('firstHerbId')) {
        this.displayType = 'herb_herb';
        this.firstHerbId = +params.get('firstHerbId');
        this.secondHerbId = +params.get('secondHerbId');
        this.body = {
          first_herb_id: this.firstHerbId,
          second_herb_id: this.secondHerbId,
          kegg_pathway_id: this.pathwayId
        };
        this._fetchMappingKeggTgts(`targets/herb_herb_tgt_kegg_map/`, this.body);
      }
    });
  }

  // fetch compound mapping information
  private _fetchMappingKeggCpds(url: string, body: object) {
    this.isLoading = true;
    this.keggCpdSubscription = this.rest.postData(url, body).subscribe(data => {
      this.mappingKeggCpds = data['mapping_kegg_cpds'];
    },
    () => {
      this.isLoadingError = true;
      this.isLoading = false;
    },
      () => {
      this.isLoading = false;
      this.isLoadingError = false;
    });
  }

  // fetch target mapping information
  private _fetchMappingKeggTgts(url: string, body: object) {
    this.isLoading = true;
    this.keggTgtSubscription = this.rest.postData(url, body).subscribe(data => {
      this.mappingKeggTgts = data['mapping_kegg_tgts'];
    },
      () => {
        this.isLoadingError = true;
        this.isLoading = false;
      },
      () => {
      this.isLoading = false;
      this.isLoadingError = false;
    });
  }

  openCompoundDialog(keggId: string): void {
    const dialogData = Object.assign({kegg_id: keggId}, this.body);
    this.dialog.open(YatcmSimilarityKeggCompoundCardComponent, {
      width: '680px',
      data: dialogData
    });
  }

  openTargetDialog(keggId: string) {
    const dialogData = Object.assign({kegg_id: keggId}, this.body);
    this.dialog.open(KeggproteinToTargetComponent, {
      width: '600px',
      data: dialogData,
    });
  }

}
