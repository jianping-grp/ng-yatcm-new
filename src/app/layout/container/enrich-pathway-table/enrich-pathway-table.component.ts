import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {Subscription} from 'rxjs/Subscription';
import {EnrichPathway} from '../../../yatcm/models/enrich-pathway/enrich-pathway';
import {KeggPathway} from '../../../yatcm/models/kegg-pathway';
import {KeggPathwayCategory} from '../../../yatcm/models/kegg-pathway-category';
@Component({
  selector: 'app-enrich-pathway-table',
  templateUrl: './enrich-pathway-table.component.html',
  styleUrls: ['./enrich-pathway-table.component.css']
})
export class EnrichPathwayTableComponent implements OnInit, OnDestroy, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  dataSubscription: Subscription;
  enrichPathways: EnrichPathway[];
  keggPathway: KeggPathway[];
  keggPathwayCategory: KeggPathwayCategory[];
  @Input() body: object;
  @Input() idType: string;
  @Input() id: string;
  @Input() tableTitle = 'Pathways with mapped compounds and/or targets, ' +
    'combining KEGG Gene Set Enrichment Analysis parameters';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = [];
  @Input() allColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    console.log('pathway table init');
    this.pageMeta.per_page = this.pageSize;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    this.dataSubscription = merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          // 判断数据类型
          return this.rest.postDataList(
              this.restUrl,
              this.body,
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
              this.includeParams
            );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          this.keggPathway = data['kegg_pathways'];
          this.keggPathwayCategory = data['kegg_pathway_second_categories'];
          switch (this.idType) {
            case 'prescription':
              return data['prescription_enrich_pathways'];
            case 'herb':
              return data['herb_enrich_pathways'];
            case 'compound':
              return data['compound_enrich_pathways'];
            case 'target':
              return data['target_enrich_pathways'];
            case 'disease':
              return data['ttd_disease_enrich_pathways'];
          }
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;

      });
  }

  getKeggPathwayCategory(category: number) {
    return this.keggPathwayCategory.find(el => el.id === category);
  }

  getKeggPathway(pathwayId: number) {
    return this.keggPathway.find(teml => teml.id === pathwayId);
  }

  gotoKeggMapDetail(pathwayId: number | string) {
    const queryParams = {pathwayId: pathwayId};
    switch (this.idType) {
      case 'prescription':
        Object.assign(queryParams, {prescriptionId: this.id}); break;
      case 'herb':
        Object.assign(queryParams, {herbId: this.id}); break;
      case 'compound':
        Object.assign(queryParams, {compoundId: this.id}); break;
      case 'target':
        Object.assign(queryParams, {targetId: this.id}); break;
      case 'ttdDisease':
        Object.assign(queryParams, {diseaseId: this.id}); break;
    }
    this.router.navigate(['pathway/kegg-map'], {queryParams: queryParams});
  }

  gotoPathwayCompoundDetail(pathwayId: number) {
    const queryParams = {pathwayId: pathwayId};
    switch (this.idType) {
      case 'prescription':
        Object.assign(queryParams, {prescriptionId: this.id});
        break;
      case 'herb':
        Object.assign(queryParams, {herbId: this.id});
        break;
      case 'compound':
        Object.assign(queryParams, {compoundId: this.id});
        break;
    }
    this.router.navigate(['pathway/compound-detail'], {queryParams: queryParams});
  }

  gotoPathwayProteinDetail(pathwayId: number) {
    const queryParams = {pathwayId: pathwayId};
    switch (this.idType) {
      case 'prescription':
        Object.assign(queryParams, {prescriptionId: this.id}); break;
      case 'herb':
        Object.assign(queryParams, {herbId: this.id}); break;
      case 'compound':
        Object.assign(queryParams, {compoundId: this.id}); break;
      case 'target':
        Object.assign(queryParams, {targetId: this.id}); break;
      case 'ttdDisease':
        Object.assign(queryParams, {diseaseId: this.id}); break;
    }
    this.router.navigate(['pathway/protein-detail'], {queryParams: queryParams});
  }
}
