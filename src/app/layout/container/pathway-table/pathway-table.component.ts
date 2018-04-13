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
  @Input() body: object;
  @Input() idType: string;
  @Input() id: number;
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['name', 'category', 'kegg_id', 'detail'];
  constructor(private rest: RestService,
              private router: Router) {

  }

  ngOnInit() {
    console.log('pathway table init');
    this.pageMeta.per_page = this.pageSize;
    if (this.idType === 'herb') {
      this.displayedColumns = ['name', 'category', 'herb_compound_in_kegg_id', 'herb_compound_detail',
        'herb_protein_detail'];
    } else if (this.idType === 'prescription') {
      this.displayedColumns = ['name', 'category', 'prescription_compound_in_kegg_id',
        'prescription_compound_detail', 'prescription_protein_detail'];
    } else if (this.idType === 'compound') {
      this.displayedColumns = ['name', 'category', 'compound_in_kegg_id',
        'compound_compound_detail', 'compound_protein_detail'];
    } else if (this.idType === 'target') {
      this.displayedColumns = ['name', 'category', 'target_in_kegg_id', 'target_protein_detail'];
    } else if (this.idType === 'disease') {
      this.displayedColumns = ['name', 'category', 'disease_in_kegg_id', 'disease_protein_detail'];
    } else {
      this.displayedColumns = ['name', 'category', 'kegg_id', 'compound_detail', 'protein_detail'];
    }
  }


  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          // 判断数据类型
        if (this.idType === 'compound' || this.idType === 'herb' || this.idType === 'prescription') {
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
          this.keggPathwayCategory = data['kegg_pathway_second_categories'];
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


  gotoKeggMapDetail(pathwayId: number | string, type: string) {
    const queryParams = {pathwayId: pathwayId};
    if (type === 'prescription') {
      Object.assign(queryParams, {prescriptionId: this.id});
    } else if (type === 'herb') {
      Object.assign(queryParams, {herbId: this.id});
    } else if (type === 'compound') {
      Object.assign(queryParams, {compoundId: this.id});
    } else if (type === 'target') {
      Object.assign(queryParams, {targetId: this.id});
    } else if (type === 'disease') {
      Object.assign(queryParams, {diseaseId: this.id});
    }
    this.router.navigate(['pathway/kegg-map'], {queryParams: queryParams});
  }

  gotoPathwayCompoundDetail(pathwayId: number, type?: string) {
    const queryParams = {pathwayId: pathwayId};
    if (type === 'prescription') {
      Object.assign(queryParams, {prescriptionId: this.id});
    } else if (type === 'herb') {
      Object.assign(queryParams, {herbId: this.id});
    } else if (type === 'compound') {
      Object.assign(queryParams, {compoundId: this.id});
    } else {
      Object.assign(queryParams, {});
    }
    this.router.navigate(['pathway/compound-detail'], {queryParams: queryParams});
  }

  gotoPathwayProteinDetail(pathwayId: number, type?: string) {
    const queryParams = {pathwayId: pathwayId};
    if (type === 'prescription') {
      Object.assign(queryParams, {prescriptionId: this.id});
    } else if (type === 'herb') {
      Object.assign(queryParams, {herbId: this.id});
    } else if (type === 'compound') {
      Object.assign(queryParams, {compoundId: this.id});
    } else if (type === 'target') {
      Object.assign(queryParams, {targetId: this.id});
    } else if (type === 'disease') {
      Object.assign(queryParams, {diseaseId: this.id});
    } else {
      Object.assign(queryParams, {});
    }
    this.router.navigate(['pathway/protein-detail'], {queryParams: queryParams});
  }

}
