import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MappingKeggCpds} from '../../../../yatcm/models/kegg-map/mapping-kegg-cpds';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';
import {MatDialog} from '@angular/material';
import {YatcmSimilarityKeggCompoundCardComponent} from '../../../../shared/card/yatcm-similarity-kegg-compound-card/yatcm-similarity-kegg-compound-card.component';

@Component({
  selector: 'app-kegg-map',
  templateUrl: './kegg-map.component.html',
  styleUrls: ['./kegg-map.component.css']
})

export class KeggMapComponent implements OnInit {
  x = 285;
  y = 530;
  @ViewChild('div') div: ElementRef;
  mapUrl: string;
  pathwayId: number | string;
  compoundId: number | string;
  keggPathway: KeggPathway;
  mappingKeggCpds: MappingKeggCpds;
  constructor(private rest: RestService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private el: ElementRef) {

  }

  ngOnInit() {
    console.log('kegg map init');
    this._getData();

  }

  private _getData() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('compoundId');
      this.pathwayId = +params.get('pathwayId');
      // fetch pathway information
      this.rest.getData(`keggpathways/${this.pathwayId}/`)
        .subscribe(data => {
          this.keggPathway = data['kegg_pathway'];
          this.mapUrl = `http://www.kegg.jp/kegg/pathway/map/${this.keggPathway.kegg_id}.png`;
          // this.div.nativeElement.style.backgroundImage.image = this.mapUrl;
            // `http://www.kegg.jp/kegg/pathway/map/${this.keggPathway.kegg_id}.png`;
        });

      const body = {
        cpd_id: this.compoundId,
        kegg_pathway_id: this.pathwayId
      };
      // fetch pathway map information
      this.rest.postData(`compounds/cpd_kegg_map/`, body)
        .subscribe(mapdata => {
          this.mappingKeggCpds = mapdata['mapping_kegg_cpds'][0];
        });
    });
  }

  openDialog(compoundId: number, pathwayId: number): void {
    this.dialog.open(YatcmSimilarityKeggCompoundCardComponent, {
      width: '680px',
      data: {
        compoundId: compoundId,
        pathwayId: pathwayId
      }
    });
  }

}
