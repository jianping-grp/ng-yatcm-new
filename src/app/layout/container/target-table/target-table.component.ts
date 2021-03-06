import {
  AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {GlobalService} from '../../../services/global/global.service';
import {CompoundListParamsType} from '../../../yatcm/enum/compound-list-param-type.enum';
import {DiseaseListParamsType} from '../../../yatcm/enum/disease-list-param-type.enum';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})

export class TargetTableComponent implements OnInit, AfterViewInit, OnChanges {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = ['target_name', 'uniprot_name',
    'gene_name', 'tcmid_link', 'detail'];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['chembl_id' , 'target_name', 'ttd_target_id', 'ttd_target_name', 'ttd_target_type', 'uniprot_name', 'gene_name',
    'tcmid_link', 'detail'];
  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService) {

  }

  ngOnInit() {
    console.log('target table init');
    this.pageMeta.per_page = this.pageSize;
  }

  ngAfterViewInit() {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    this.getData();
  }

  getData() {
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
          return data['targets'];
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

  gotoCompoundList(targetId: number) {
    this.globalService.gotoCompoundList(CompoundListParamsType.target_id, {
      targetId: targetId
    });
  }

  gotoDiseaseList(targetId: number) {
    this.globalService.gotoDiseaseList(DiseaseListParamsType.target_id, {
      targetId: targetId
    });
  }

}
