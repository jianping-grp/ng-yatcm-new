import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Seatarget} from "../../../../yatcm/models/seatarget";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {PageMeta} from "../../../../yatcm/models/page-meta";
import {Observable} from "rxjs/Observable";
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-compound-sea-target',
  templateUrl: 'compound-sea-target.component.html',
  styleUrls: ['./compound-sea-target.component.css']
})
export class CompoundSeaTargetComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  pageSizeOptions = [5, 10, 20, 50, 100];
  pageMeta = new PageMeta();
  compoundId: number;
  tableTitle = '';
  includeParams = '';
  pageSize = 5;
  isLoading = false;
  isLoadingError = false;
  restUrl$: Observable<string>;
  restUrl: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['chembl_id', 'name', 'target_type', 'organism', 'species_group_flag']
  allColumns = ['chembl_id', 'name', 'target_type', 'organism', 'species_group_flag']
  constructor(private route: ActivatedRoute,
              private rest: RestService) {
  }

  ngOnInit() {
    console.log('compound sea target init');
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      this.compoundId = +params.get('id');
      return `seatargets/?filter{compound_set.id}=${this.compoundId}`;
    });
    this.pageMeta.per_page = this.pageSize;
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
          return data['sea_targets'];
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



}
