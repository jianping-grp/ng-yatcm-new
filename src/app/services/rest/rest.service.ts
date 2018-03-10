import {Injectable} from '@angular/core';
import * as Setting from '../../setting';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

@Injectable()
export class RestService {
  private restHost = Setting.REST_HOST;

  constructor(private http: HttpClient, private globalService: GlobalService) {
  }

  public getData(url: string): Observable<any> {
    this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}`)
    .finally(() => this.globalService.setLoading(false));
  }

  public getDataList(url: string,
                     page = 0,
                     perPage = Setting.PER_PAGE,
                     sortby = '', extraParam = ''): Observable<any> {
    // page + 1, as mat-paginator is 0-base while DRF is 1-base;
    page = +(page) + 1;
    // set global loadingStatus to true
    this.globalService.setLoading(true);

    let sortParam = '';
    if (sortby !== '') {
      sortParam = `&sort[]=${sortby}`;
    }
    return this.http.get(`${this.restHost}/${url}${extraParam}&page=${page}&per_page=${perPage}${sortParam}`)
      .finally(() => this.globalService.setLoading(false));
  }
}
