import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../yatcm/models/page-meta';
import {Observable} from 'rxjs/Observable';
import {Target} from '../../../yatcm/models/target';
import {GlobalService} from "../../../services/global/global.service";
import {CompoundListParamsType} from "../../../yatcm/enum/compound-list-param-type.enum";

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})

export class TargetTableComponent implements OnInit {
  dataSource = new MatTableDataSource();
  targets: Target[];
  pageMeta: PageMeta | null;
  restUrl: string;
  @Input() tableTitle = '';
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() pageSize = 10;
  allColumns = ['target_name', 'uniprot_name', 'gene_name', 'tcmid_link', 'compounds'];
  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService) {

  }

  ngOnInit() {
    console.log('target table init');
    this._getTargets(0, this.pageSize);
  }

  gotoCompoundList(targetId: number | string) {
    this.globalService.gotoCompoundList(CompoundListParamsType.target_id, {
      targetId: targetId
    });
  }

  private _getTargets(page?, perPage?) {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.rest.getDataList(this.restUrl, page, perPage)
      .subscribe(data => {
        this.targets = data['targets'];
        this.dataSource.data = this.targets;
        this.pageMeta = data['meta'];
      });

  }

  pageChange(event) {
    this._getTargets(event.pageIndex, event.pageSize);
  }

}
