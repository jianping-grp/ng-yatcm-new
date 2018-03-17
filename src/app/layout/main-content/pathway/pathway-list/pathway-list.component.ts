import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PathwayListParamsType} from '../../../../yatcm/enum/pathway-list-param-type.enum';
import {KeggPathwayCategory} from '../../../../yatcm/models/kegg-pathway-category';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {RestService} from '../../../../services/rest/rest.service';

@Component({
  selector: 'app-pathway-list',
  templateUrl: './pathway-list.component.html',
  styleUrls: ['./pathway-list.component.css']
})
export class PathwayListComponent implements OnInit, AfterViewInit {
  herbId: number | string;
  prescriptionId: number  | string;
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  keggPathwayCategory: KeggPathwayCategory[];
  tableTitle = '';
  pageSize = 10;
  pageSizeOptions = [5, 10, 50, 100];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  restUrl$: Observable<string>;
  includeParams = '&include[]=category.*';
  displayedColumns = ['pathway_name', 'category', 'kegg_id', 'detail'];
  allColumns = ['pathway_name', 'category', 'kegg_id', 'detail'];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router) {

  }
  ngOnInit() {
    console.log('pathway list init');
    this.pageMeta.per_page = this.pageSize;
    this.restUrl$ = this._getRestUrl();
  }

  gotoPathwayDetail(pid: number | string) {
    this.router.navigate(['pathway', pid]);
  }
  // 根据不同的参数，生成$url
  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case PathwayListParamsType.pathway:
            return `keggpathways/?${this.includeParams}`;
          case PathwayListParamsType.herb_id:
            this.herbId = +params.get('herbId');
            this.displayedColumns = ['pathway_name', 'category', 'herb_compound_in_kegg_id', 'detail'];
            this.allColumns = ['pathway_name', 'category', 'herb_compound_in_kegg_id', 'detail'];
            return `keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.id}=${this.herbId}` +
              `${this.includeParams}`;
          case PathwayListParamsType.prescription_id:
            this.prescriptionId = +params.get('prescriptionId');
            return `keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.prescription.id}=` +
              `${this.prescriptionId}${this.includeParams}`;
        }
      }
    });
  }

  // fetch data list
  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(
            this.restUrl,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active, ''
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          this.keggPathwayCategory = data['kegg_pathway_categories'];
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

  getKeggPathwayCategory(category: number | string) {
    return this.keggPathwayCategory.find(el => el.id === category);
  }

}

