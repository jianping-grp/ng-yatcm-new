import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Compound} from '../../../../yatcm/models/compound';
import {Target} from '../../../../yatcm/models/target';
import {PageMeta} from '../../../../yatcm/models/page-meta';
import {Chembl} from "../../../../yatcm/models/chembl";
import {MatTableDataSource} from "@angular/material";
import {Seatarget} from '../../../../yatcm/models/seatarget';


@Component({
  selector: 'app-compound-detail',
  templateUrl: './compound-detail.component.html',
  styleUrls: ['./compound-detail.component.css']
})
export class CompoundDetailComponent implements OnInit {

  compound: Compound;
  compoundId: number | string;
  tableTitle = '';
  pageSizeOptions = [5, 10, 20, 50, 100];
  seaTargets: Seatarget[] | null;
  seaTargetPageMeta: PageMeta | null;
  seaTargetDataSource = new MatTableDataSource();
  chembls: Chembl[]; // related chembl compounds
  chemblsPageMeta: PageMeta[] | null;
  chemblsDataSource = new MatTableDataSource();
  pageMeta: PageMeta[] | null;
  chemblDisplayedColumns = ['chembl_id', 'pref_name', 'tanimoto', 'same_or_similarity', 'prodrug',
    'max_phase', 'oral', 'targets'];
  chemblAllColumns = ['chembl_id', 'pref_name', 'tanimoto', 'same_or_similarity', 'prodrug',
    'max_phase', 'oral', 'targets'];
  includeParams = 'include[]=herb_set.id&include[]=herb_set.Chinese_name' +
    '&include[]=herb_set.English_name&exclude[]=herb_set.*' +
    '&include[]=cid.*&include[]=cas.*' +
    '&include[]=compoundfirstcatagory_set.*&include[]=compoundsecondcatagory_set' +
    '&include[]=tcmid_herbs_set.*&include[]=target_set.*' +
    '&include[]=sea_targets.*' +
    '&include[]=compound_ms_set.*';
  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
    console.log('compound detail init');
    this._getData();
  }

  gotoHerbDetail(hid: number | string) {
    this.router.navigate(['herb', hid]);
  }

  gotoChemblDetail(chemblId: number | string) {
    this.router.navigate(['chembl-compound', chemblId]);
  }

  gotoChemblRelatedTargets(chemblId: number | string) {
    this.router.navigate(['chemblrelatedtargets', chemblId]);
  }

  getMsId(msUrl: string) {
    return msUrl.slice(67);
  }

  private _getData() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('id');
      // fetch compound
      this.rest.getData(`compounds/${this.compoundId}/?${this.includeParams}`)
        .subscribe(data => {
          this.compound = data['compound'];
        });
      // fetch chembl compounds
      this._getChembls(0, 5);

      // fetch sea targets
      this._getSeaTargets(0, 5);
    });
  }

  // get related chembl compounds
  private _getChembls(page?, perPage?) {
    this.rest.getDataList(`chembls/?filter{compound_set}=${this.compoundId}` +
      `&include[]=chemblrelatedtargets.id&exclude[]=chemblrelatedtargets.*`, page, perPage)
      .subscribe(data => {
        this.chembls = data['ch_embls'];
        this.chemblsDataSource.data = this.chembls;
        this.chemblsPageMeta = data['meta'];
      });
  }

  chemblsPageChange(event) {
    this._getChembls(event.pageIndex, event.pageSize);
  }

  // get SEA targets
  private _getSeaTargets(page?, perPage?) {
    this.rest.getDataList(`seatargets/?filter{compound_set.id}=${this.compoundId}`, page, perPage)
      .subscribe(data => {
        this.seaTargets = data['sea_targets'];
        this.seaTargetDataSource.data = this.seaTargets;
        this.seaTargetPageMeta = data['meta'];
      });
  }

  seaTargetPageChange(event) {
    this._getSeaTargets(event.pageIndex, event.pageSize);
  }
}
