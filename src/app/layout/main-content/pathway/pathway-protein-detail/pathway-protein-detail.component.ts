import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import {MatTableDataSource} from '@angular/material';
import {KeggPathway} from '../../../../yatcm/models/kegg-pathway';
import {KeggProtein} from '../../../../yatcm/models/kegg-protein';
import {Target} from '../../../../yatcm/models/target';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-pathway-protein-detail',
  templateUrl: './pathway-protein-detail.component.html',
  styleUrls: ['./pathway-protein-detail.component.css']
})
export class PathwayProteinDetailComponent implements OnInit, OnDestroy {
  pageSizeOptions = [5, 10, 50, 100];
  targetId: number;
  targets: Target[];
  pathwayId: number | string;
  pathway: KeggPathway;
  pageMeta: PageMeta | null;
  restUrl: string;
  url: string;
  idSubsription: Subscription;
  dataSource = new MatTableDataSource();
  includeParams = '&include[]=keggprotein_set.kegg_id&exclude[]=keggprotein_set.*';
  displayedColumns = ['kegg_protein', 'tcm_target', 'view_in_map'];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router) {

  }
  ngOnInit() {
    console.log('pathway protein detail init');
    this._getData();
  }

  ngOnDestroy() {
    this.idSubsription.unsubscribe();
  }

   private _getData() {
    this.idSubsription = this.route.queryParamMap.subscribe((params: ParamMap) => {
       this.pathwayId = +params.get('pathwayId');
       this.rest.getDataList(`keggpathways/?filter{id}=${this.pathwayId}`, 0, 99999)
         .subscribe(data => {
           this.pathway = data['kegg_pathways'][0];
         });
       // 一个targe对应一个keggprotein
       if (params.has('herbId')) {
         const herbId = +params.get('herbId');
         this.url = `targets/?filter{keggprotein_set.pathways.id}=${this.pathwayId}` +
           `&filter{compounds.herb_set.id}=${herbId}` + `${this.includeParams}`;
       } else if (params.has('prescriptionId')) {
         const prescriptionId = +params.get('prescriptionId');
         this.url = `targets/?filter{keggprotein_set.pathways.id}=${this.pathwayId}` +
           `&filter{compounds.herb_set.prescription_set.id}=${prescriptionId}` +
           `${this.includeParams}`;
       } else if (params.has('compoundId')) {
         const compoundId = +params.get('compoundId');
         this.url = `targets/?filter{keggprotein_set.pathways.id}=${this.pathwayId}` +
           `&filter{compounds.id}=${compoundId}` + `${this.includeParams}`;
       } else if (params.has('targetId')) {
         const targetId = +params.get('targetId');
         this.url = `targets/?filter{keggprotein_set.pathways.id}=${this.pathwayId}` +
           `&filter{id}=${targetId}` + `${this.includeParams}`;
       } else if (params.get('diseaseId')) {
         const diseaseId = +params.get('diseaseId');
         this.url = `targets/?filter{keggprotein_set.pathways.id}=${this.pathwayId}` +
           `&filter{ttddisease_set.id}=${diseaseId}` + `${this.includeParams}`;
       } else if (params.get('firstHerbId')) {
         const firstHerbId = +params.get('firstHerbId');
         const secondHerbId = +params.get('secondHerbId');
         this.url = `targets/herb_herb_tgt_list_in_special_pathway/?first_herb_id=${firstHerbId}` +
           `&second_herb_id=${secondHerbId}&kegg_pathway_id=${this.pathwayId}` +
           `${this.includeParams}`;
       } else {
         this.url = `targets/?filter{keggprotein_set.pathways.id}=${this.pathwayId}` +
           `${this.includeParams}`;
       }
       this._getTargetAndKeggProtein();
     });
  }

  private _getTargetAndKeggProtein(page?, perPage?) {
    this.rest.getDataList(this.url, page, perPage)
      .subscribe(data => {
        this.targets = data['targets'];
        this.dataSource.data = this.targets;
        this.pageMeta = data['meta'];
      });
  }

  pageChange(event) {
    this._getTargetAndKeggProtein(event.pageIndex, event.pageSize);
  }

  gotoKeggMapDetail(targetId: number) {
    const keggId = this.targets.find(el => el.id === targetId).keggprotein_set[0].kegg_id;
    this.router.navigate(['pathway/kegg-map'], {queryParams: {
      targetId: targetId,
      pathwayId: this.pathwayId,
      keggId: keggId
    }});
  }
}
