import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {CompoundParamInterpretation} from "../../../yatcm/enum/compound-param-interpretation.enum";
@Component({
  selector: 'app-compound-table',
  templateUrl: './compound-table.component.html',
  styleUrls: ['./compound-table.component.css']
})
export class CompoundTableComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  compoundTooltip = CompoundParamInterpretation;
  @Input() body: object;
  @Input() type: string;
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = ['molecule', 'english_name', 'formula', 'mol_weight', 'alogp',
    // 'cid', 'cas',
    'psa', 'hba', 'hbd', 'rtb', 'DL'];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['molecule', 'english_name', 'chinese_name', 'formula', 'mol_weight', 'alogp', 'psa', 'hba', 'hbd', 'rtb',
   'FISA', 'FOSA', 'ACxDN_05_SA', 'RuleOfThree', 'amine', 'QPlogHERG', 'QPlogKhsa', 'QPlogKp', 'QPPMDCK', 'donorHB',
    'SASA', 'stars', 'dip_2_v', 'QPlogPoct', 'acceptHB', 'RuleOfFive', 'Safluorine', 'CIQPlogS', 'volume', 'in34',
    'amide', 'QPplrz', 'SAamideO', 'EA_ev', 'QPlogS', 'QPlogPC16', 'DL', 'QPlogPo_w', 'amidine', 'acid', 'CNS', 'rtvFG',
    'rotor', 'HumanOralAbsorption', 'dipole', 'ringatoms', 'QPlogPw', 'QPlogBB', 'WPSA', 'noncon', 'glob', 'IP_eV',
    'PercentHumanOralAbsorption', 'QPPCaco', 'metab', 'int56', 'nonHatm'
    // 'cid', 'cas',
  ];
  constructor(private router: Router,
              private rest: RestService) {
  }
  ngOnInit() {
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
          if (this.type === 'structureSearch') {
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
          return data['compounds'];
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
