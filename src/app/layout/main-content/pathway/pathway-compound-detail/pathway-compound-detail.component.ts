import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import {MatTableDataSource} from '@angular/material';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';

@Component({
  selector: 'app-pathway-detail',
  templateUrl: './pathway-compound-detail.component.html',
  styleUrls: ['./pathway-compound-detail.component.css']
})
export class PathwayCompoundDetailComponent implements OnInit {
  pageSizeOptions = [5, 10, 50, 100];
  pathwayId: number | string;
  pathway: KeggPathway[];
  pageMeta: PageMeta | null;
  restUrl: string;
  dataSource = new MatTableDataSource();
  includeParams = '&include[]=kegg_compound.*' +
    '&include[]=tcm.id&include[]=tcm.english_name' +
    '&include[]=tcm.smiles&include[]=tcm.mol_image&exclude[]=tcm.*';
  displayedColumns = ['keggcompound', 'tcm', 'view_in_map'];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router)  {

  }
  ngOnInit() {
    console.log('pathway detail init');
    this._getData();
  }

  private _getData() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.pathwayId = +params.get('pathwayId');
      this.rest.getDataList(`keggpathways/?filter{id}=${this.pathwayId}`, 0, 9999)
        .subscribe(data => {
          this.pathway = data['kegg_pathways'][0];
        });
      // 根据不同的参数， 获取tcm 和 keggCompound
      if (params.has('herbId')) {
        const herbId = +params.get('herbId');
        this.restUrl = `keggsimilarities/?filter{tcm.herb_set.id}=${herbId}` +
          `&filter{kegg_compound.pathway}=${this.pathwayId}${this.includeParams}`;
      } else if (params.has('prescriptionId')) {
        const prescriptionId = +params.get('prescriptionId');
        this.restUrl = `keggsimilarities/?filter{tcm.herb_set.prescription_set.id}=${prescriptionId}` +
          `&filter{kegg_compound.pathway}=${this.pathwayId}${this.includeParams}`;
      } else if (params.has('compoundId')) {
        const compoundId = +params.get('compoundId');
        this.restUrl = `keggsimilarities/?filter{tcm.id}=${compoundId}` +
          `&filter{kegg_compound.pathway}=${this.pathwayId}${this.includeParams}`;
      } else {
        this.restUrl = `keggsimilarities/?filter{kegg_compound.pathway}=${this.pathwayId}${this.includeParams}`;
      }
      this._getTcmAndKeggCompound();
    });
  }

  // fetch tcm and keggcompound
  private _getTcmAndKeggCompound(page?, perPage?) {
    this.rest.getDataList(this.restUrl, page,  perPage)
      .subscribe(data => {
        this.dataSource.data = data['kegg_similarities'];
        this.pageMeta = data['meta'];
      });
  }

  pageChange(event) {
    this._getTcmAndKeggCompound(event.pageIndex, event.pageSize);
  }

  gotoKeggMapDetail(compoundId: number | string, keggId: string) {
    this.router.navigate(['pathway/kegg-map'], {queryParams: {
      compoundId: compoundId,
      pathwayId: this.pathwayId,
      keggId: keggId
    }});
  }
}
