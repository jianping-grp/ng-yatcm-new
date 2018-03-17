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
import {GlobalService} from "../../../services/global/global.service";
import {PathwayListParamsType} from "../../../yatcm/enum/pathway-list-param-type.enum";

@Component({
  selector: 'app-herb-table',
  templateUrl: './herb-table.component.html',
  styleUrls: ['./herb-table.component.css']
})
export class HerbTableComponent implements OnInit, AfterViewInit {

  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  HerbList: Herb[];
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['image', 'English_name', 'Chinese_name', 'phonetic_name', 'ingredients', 'first_category',
    'second_category', 'effect', 'latin_name', 'drug_property', 'wiki_chinese', 'wiki_english', 'indication',
    'meridians', 'related_herb', 'subherb', 'pathway', 'detail'];
  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
  }

  gotoHerbDetail(hid: number | string) {
    this.router.navigate(['herb', hid]);
  }

  goPathwayList(herbId: number | string) {
    this.globalService.gotoPathwayList(PathwayListParamsType.herb_id, {
      herbId: herbId
    })
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
          return data['herbs'];
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
