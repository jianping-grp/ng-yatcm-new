import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {KeggPathwayCategory} from '../../../yatcm/models/kegg-pathway-category';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-pathway-table',
  templateUrl: './pathway-table.component.html',
  styleUrls: ['./pathway-table.component.css']
})
export class PathwayTableComponent implements OnInit, AfterViewInit, OnDestroy {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  dataSubscription: Subscription;
  keggPathwayCategory: KeggPathwayCategory[];
  @Input() body: object;
  @Input() idType: string;
  @Input() id: string;
  @Input() tableTitle = 'Pathways with mapped compounds and/or targets. ';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['name', 'category', 'kegg_id', 'detail'];
  constructor(private rest: RestService,
              private router: Router) {

  }

  ngOnInit() {
    console.log('pathway table init');
    this.pageMeta.per_page = this.pageSize;
    if (this.idType === 'herb' || this.idType === 'prescription' || this.idType === 'compound') {
      this.displayedColumns = ['name', 'category', 'kegg_id', 'compound_detail', 'protein_detail'];
    } else
    if (this.idType === 'target' || this.idType === 'disease' || this.idType === 'herb_herb') {
      this.displayedColumns = ['name', 'category', 'kegg_id', 'protein_detail'];
    }  else {
      this.displayedColumns = ['name', 'category', 'other_kegg_id', 'compound_detail', 'protein_detail'];
    }
  }


  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    this.dataSubscription = merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          // 判断数据类型 原来是判断idType是不是等于compound，herb，prescription(全部是只有映射通路，现在是只有映射通路）
        if (this.idType === 'compound' || this.idType === 'herb' || this.idType === 'prescription'
         || this.idType === 'target' || this.idType === 'disease') {
            return this.rest.postDataList(
              this.restUrl,
              this.body,
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
              this.includeParams
            );
          } else {
            return this.rest.getDataList(
              this.restUrl,
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
              this.includeParams
            );
          }
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          this.keggPathwayCategory = data['kegg_pathway_second_categories'];
          return data['kegg_pathways'];
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

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  getKeggPathwayCategory(category: number) {
    return this.keggPathwayCategory.find(el => el.id === category);
  }


  getQueryParams(pathwayId: number) {
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
      case 'disease':
        Object.assign(queryParams, {diseaseId: this.id}); break;
      case 'herb_herb': {
        const idArray = this.id.split(',');
        const first_herb_id = idArray[0];
        const second_herb_id = idArray[1];
        Object.assign(queryParams, {
          firstHerbId: first_herb_id,
          secondHerbId: second_herb_id,
        });
        break;
      }
       default:
         Object.assign(queryParams, {});
    }
    return queryParams;
  }

  gotoKeggMapDetail(pathwayId: number) {
    const queryParams = this.getQueryParams(pathwayId);
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

  gotoPathwayProteinDetail(pathwayId: number, type?: string) {
    const queryParams = this.getQueryParams(pathwayId);
    this.router.navigate(['pathway/protein-detail'], {queryParams: queryParams});
  }

}
