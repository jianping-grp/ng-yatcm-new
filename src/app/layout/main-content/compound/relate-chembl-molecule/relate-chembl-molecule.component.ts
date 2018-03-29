import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-relate-chembl-molecule',
  templateUrl: './relate-chembl-molecule.component.html',
  styleUrls: ['./relate-chembl-molecule.component.css']
})
export class RelateChemblMoleculeComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  pageSizeOptions = [5, 10, 20, 50, 100];
  pageMeta = new PageMeta();
  tableTitle = '';
  includeParams = '';
  pageSize = 5;
  isLoading = false;
  isLoadingError = false;
  restUrl$: Observable<string>;
  restUrl: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  compoundId: number;
  displayedColumns = ['chembl_id', 'pref_name', 'tanimoto', 'same_or_similarity', 'prodrug',
    'max_phase', 'oral'];
  allColumns = ['chembl_id', 'pref_name', 'tanimoto', 'same_or_similarity', 'prodrug',
    'max_phase', 'oral'];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router) {

  }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.compoundId = +params.get('id');
      return `chembls/?filter{compound_set}=${this.compoundId}`;
    });
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
          return data['ch_embls'];
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

  gotoChemblDetail(chemblId: number | string) {
    this.router.navigate(['chembl-compound', chemblId]);
  }

}
