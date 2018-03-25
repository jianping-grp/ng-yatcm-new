import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Chembl} from '../../../../yatcm/models/chembl';
import {MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../yatcm/models/page-meta';

@Component({
  selector: 'app-relate-chembl-molecule',
  templateUrl: './relate-chembl-molecule.component.html',
  styleUrls: ['./relate-chembl-molecule.component.css']
})
export class RelateChemblMoleculeComponent implements OnInit {
  chembls: Chembl[];
  tableTitle = '';
  pageSizeOptions = [5, 10, 20, 50, 100];
  dataSource = new MatTableDataSource();
  pageMeta: PageMeta[] | null;
  compoundId: number;
  displayedColumns = ['chembl_id', 'pref_name', 'tanimoto', 'same_or_similarity', 'prodrug',
    'max_phase', 'oral', 'targets'];
  allColumns = ['chembl_id', 'pref_name', 'tanimoto', 'same_or_similarity', 'prodrug',
    'max_phase', 'oral', 'targets'];
  constructor(private route: ActivatedRoute,
              private rest: RestService) {

  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('id');
      this._getChembls(0, 5);
    });
  }


  private _getChembls(page?, perPage?) {
    this.rest.getDataList(`chembls/?filter{compound_set}=${this.compoundId}` +
      `&include[]=chemblrelatedtargets.id&exclude[]=chemblrelatedtargets.*`, page, perPage)
      .subscribe(data => {
        this.chembls = data['ch_embls'];
        this.dataSource.data = this.chembls;
        this.pageMeta = data['meta'];
      });
  }

  pageChange(event) {
    this._getChembls(event.pageIndex, event.pageSize);
  }
}
