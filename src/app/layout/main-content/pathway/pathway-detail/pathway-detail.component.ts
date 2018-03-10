import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import {MatTableDataSource} from '@angular/material';
import {Compound} from '../../../../yatcm/models/compound';
import {KeggCompound} from '../../../../yatcm/models/kegg-compound';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';

@Component({
  selector: 'app-pathway-detail',
  templateUrl: './pathway-detail.component.html',
  styleUrls: ['./pathway-detail.component.css']
})
export class PathwayDetailComponent implements OnInit {
  pageSizeOptions = [5, 10, 50, 100];
  pathwayId: number | string;
  pathway: KeggPathway[];
  pageMeta: PageMeta | null;
  dataSource = new MatTableDataSource();
  includeParams = '&include[]=kegg_compound.*' +
    '&include[]=tcm.id&include[]=tcm.english_name&' +
    'include[]=tcm.smiles&include[]=tcm.mol_image&exclude[]=tcm.*';
  displayedColumns = ['keggcompound', 'tcm', 'view_in_map'];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router)  {

  }
  ngOnInit() {
    console.log('pathway detail init');
    this._getPathway();
  }

  gotoCompoundDetail(compoundId: number | string) {
    this.router.navigate(['compound', compoundId]);
  }

  private _getPathway() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pathwayId = +params.get('id');
      this.rest.getData(`keggpathways/?filter{id}=${this.pathwayId}`)
        .subscribe(data => {
          this.pathway = data['kegg_pathways'][0];
        });
     // fetch tcm and keggcompound
      this._getTcmAndKeggCompound(this.pathwayId);
    });
  }

  private _getTcmAndKeggCompound(pathwayId: number | string, page?, perPage?) {
    this.rest.getDataList(`keggsimilarities/?filter{kegg_compound.pathway}=${pathwayId}${this.includeParams}`, page,  perPage)
      .subscribe(data => {
        this.dataSource.data = data['kegg_similarities'];
        this.pageMeta = data['meta'];
      });
  }


  pageChange(event) {
    this._getTcmAndKeggCompound(this.pathwayId, event.pageIndex, event.pageSize);
  }
}
