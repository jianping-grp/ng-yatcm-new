import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Compound} from '../../../../yatcm/models/compound';

@Component({
  selector: 'app-compound-detail',
  templateUrl: './compound-detail.component.html',
  styleUrls: ['./compound-detail.component.css']
})
export class CompoundDetailComponent implements OnInit {

  compound: Compound;
  compoundId: number | string;
  includeParams = 'include[]=herb_set.id&include[]=herb_set.Chinese_name' +
    '&include[]=herb_set.English_name&exclude[]=herb_set.*' +
    '&include[]=cid.*&include[]=cas.*' +
    '&include[]=compoundfirstcatagory_set.*&include[]=compoundsecondcatagory_set' +
    '&include[]=tcmid_herbs_set.*';
  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
    console.log('compound detail init');
    this._getData();
  }

  private _getData() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.compoundId = +params.get('id');
      // fetch compound
      this.rest.getData(`compounds/${this.compoundId}/?${this.includeParams}`)
        .subscribe(data => {
          this.compound = data['compound'];
        });
    });
  }

  gotoHerbDetail(hid: number | string) {
    this.router.navigate(['herb', hid]);
  }

  getMsId(msUrl: string) {
    return msUrl.slice(67);
  }

}
