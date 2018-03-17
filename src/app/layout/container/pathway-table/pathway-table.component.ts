import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {KeggPathwayCategory} from '../../../yatcm/models/kegg-pathway-category';

@Component({
  selector: 'app-pathway-table',
  templateUrl: './pathway-table.component.html',
  styleUrls: ['./pathway-table.component.css']
})
export class PathwayTableComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  keggPathwayCategory: KeggPathwayCategory[];
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['pathway_name', 'category', 'kegg_id', 'detail'];
  constructor(private rest: RestService,
              private router: Router) {

  }

  ngOnInit() {
    console.log('pathway table init');
    this.pageMeta.per_page = this.pageSize;
  }

  gotoPathwayDetail(pid: number | string) {
    this.router.navigate(['pathway', pid]);
  }

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
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
            this.includeParams
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
