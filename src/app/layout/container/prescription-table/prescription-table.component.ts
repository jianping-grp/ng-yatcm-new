import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {GlobalService} from "../../../services/global/global.service";
import {HerbListParamsType} from "../../../yatcm/enum/herb-list-param-type.enum";
import {PathwayListParamsType} from "../../../yatcm/enum/pathway-list-param-type.enum";

@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.css']
})
export class PrescriptionTableComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;

  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['chinese_name', 'phonetic_name', 'english_name', 'main_prescription', 'prescription_herb',
    'traditional_usage', 'modern_usage', 'modern_usage(english)', 'traditional_application',
    'traditional_application(english)',
    'traditional_explanation', 'pathway', 'detail'];
  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService) { }
  ngOnInit() { }

  gotoPrescriptionDetail(prescriptionId: number | string) {
    this.router.navigate(['prescription', prescriptionId]);
  }

  goHerbList(prescriptionId: number | string) {
    this.globalService.gotoHerbList(HerbListParamsType.prescription_id, {
      prescriptionId: prescriptionId
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
          return data['prescriptions'];
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

  goPathwayList(prescriptionId: number | string) {
    this.globalService.gotoPathwayList(PathwayListParamsType.prescription_id, {
      prescriptionId: prescriptionId
    });
  }
}
