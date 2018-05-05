import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Herb} from '../../../yatcm/models/herb';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {GlobalService} from '../../../services/global/global.service';

@Component({
  selector: 'app-herb-herb-network-table',
  templateUrl: './herb-herb-network-table.component.html',
  styleUrls: ['./herb-herb-network-table.component.css']
})

export class HerbHerbNetworkTableComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  herbList: Herb[];
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = ['first_herb', 'second_herb', 'first_herb_image', 'second_herb_image', 'shared_targets'];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  includeParams = '&exclude[]=first_herb.*&include[]=first_herb.id&include[]=first_herb.image' +
    '&include[]=first_herb.Chinese_name&include[]=first_herb.English_name' +
    '&exclude[]=second_herb.*&include[]=second_herb.id&include[]=second_herb.image' +
    '&include[]=second_herb.Chinese_name&include[]=second_herb.English_name';
  allColumns = ['first_herb', 'second_herb', 'first_herb_image', 'second_herb_image', 'shared_targets'];
  constructor(private rest: RestService,
              private router: Router) {
  }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data + this.includeParams);
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
          this.herbList = data['herbs'];
          return data['herb_networks'];
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

  getHerbIdObj(herbId): Herb {
    return <Herb>this.herbList.find(el => el.id === herbId);
  }

  gotoNetworkTargets(firstHerbId, secondHerbId) {
    // todo add
  }
}
