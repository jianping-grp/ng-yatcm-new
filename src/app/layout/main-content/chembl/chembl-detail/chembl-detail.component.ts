import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Chembl} from '../../../../yatcm/models/chembl';
import {Activity} from '../../../../yatcm/models/activity';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Target} from "../../../../yatcm/models/target";
import {Chemblrelatedtarget} from "../../../../yatcm/models/chemblrelatedtarget";
import {DocCardComponent} from "../../../../shared/card/doc-card/doc-card.component";
import {AssayCardComponent} from "../../../../shared/card/assay-card/assay-card.component";
import {ChemblRelatedTargetCardComponent} from "../../../../shared/card/chembl-related-target-card/chembl-related-target-card.component";

@Component({
  selector: 'app-chembl-detail',
  templateUrl: './chembl-detail.component.html',
  styleUrls: ['./chembl-detail.component.css']
})

export class ChemblDetailComponent implements OnInit {

  chembl: Chembl;
  activities: Activity[];
  dataSource = new MatTableDataSource();
  targets: Chemblrelatedtarget[];
  pageMeta: PageMeta | null;
  chemblId: number | string;
  tableTitle = '';
  pageSizeOptions = [5, 10, 50, 100];
  displayedColumns = ['standard_type', 'standard_flag', 'standard_value', 'standard_relation',
    'published_value', 'pchembl_value', 'target', 'assay', 'reference'];
  allColumns = ['standard_type', 'standard_value', 'standard_value', 'standard_relation',
    'published_value', 'target', 'assay', 'reference'];


  constructor(private route: ActivatedRoute,
              private rest: RestService,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    console.log('chembl detail init');
    this._getChembl();
  }

  openDocDialog(docId: number): void {
    this.dialog.open(DocCardComponent, {
      width: '600px',
      data: {
        docId: docId
      }
    });
  }

  openAssayDialog(assayId: number): void {
    this.dialog.open(AssayCardComponent, {
      width: '400px',
      data: {
        assayId: assayId
      }
    });
  }

  openTargetDialog(chemblId: number | string, activityId: number | string) {
    this.dialog.open(ChemblRelatedTargetCardComponent, {
      width: '400px',
      data: {
        chemblId: chemblId,
        activityId: activityId
      }
    })
  }

  private _getChembl() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chemblId = +params.get('id');
      this.rest.getData(`chembls/?filter{id}=${this.chemblId}`)
        .subscribe(data => {
          this.chembl = data['ch_embls'][0];
        });
      this._getActivities();
    });
  }



  private _getActivities(page?, perPage?) {
    this.rest.getDataList(`activities/?filter{chembl_set.id}=${this.chemblId}` +
      `&include[]=assay.chemblid&include[]=assay.id&exclude[]=assay.*&include[]=doc.*`, page, perPage)
      .subscribe(data => {
        this.activities = data['activities'];
        this.dataSource.data = this.activities;
        this.pageMeta = data['meta'];
      });
  }

  pageChange(event) {
    this._getActivities( event.pageIndex, event.pageSize);
  }
}
