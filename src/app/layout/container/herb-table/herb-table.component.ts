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
import {PathwayListParamsType} from '../../../yatcm/enum/pathway-list-param-type.enum';
import {CompoundListParamsType} from '../../../yatcm/enum/compound-list-param-type.enum';

@Component({
  selector: 'app-herb-table',
  templateUrl: './herb-table.component.html',
  styleUrls: ['./herb-table.component.css']
})
export class HerbTableComponent implements OnInit, AfterViewInit {
  emptyTooltip = 'Sorry, there is no related information';
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
  @Input() displayedColumns = ['image', 'Chinese_name', 'English_name', 'phonetic_name',
      'effect',
    // 'first_category', 'drug_property',
    // 'wiki_chinese', 'wiki_english', 'second_category', 'subherb',
    // 'latin_name', 'detail',  'related_herb','ingredients',
    'indication',
    // 'meridians'
  ];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['image', 'Chinese_name', 'English_name', 'phonetic_name', 'latin_name',
    'ingredients', 'first_category', 'effect', 'drug_property',
    // 'wiki_chinese', 'wiki_english', 'second_category', 'subherb',  'detail',  'related_herb'
    'indication', 'meridians'];
  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
  }

  goPathwayList(herbId: number | string) {
    this.globalService.gotoPathwayList(PathwayListParamsType.herb_id, {
      herbId: herbId
    });
  }

  gotoCompoundList(herbId: number) {
    this.globalService.gotoCompoundList(CompoundListParamsType.herb_id, {
      herbId: herbId
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
