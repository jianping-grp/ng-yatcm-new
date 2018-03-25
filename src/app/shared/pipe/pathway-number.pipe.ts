import {Pipe, PipeTransform} from "@angular/core";
import {RestService} from "../../services/rest/rest.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {empty} from 'rxjs/observable/empty';
import 'rxjs/add/operator/catch';

@Pipe({
  name: 'pathwayNumber'
})
export class PathwayNumberPipe implements PipeTransform {
  constructor(private  rest: RestService) {
  }

  transform(id: number | string, idType: string): Observable<number> {
    if (idType === 'herb') {
     return this.rest.getDataList(`keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.id}=${id}` +
             `&include[]=id&exclude[]=*`, 0, 99999)
        .map(data => data['kegg_pathways'].length)
        .catch(() => {
       console.log('error occur in herbId to pathaway number');
       return empty();
        });
    } else if (idType === 'prescription') {
      return this.rest.getDataList(`keggpathways/?filter{keggcompound_set.keggsimilarity_set.tcm.herb_set.prescription_set.id}=` +
      `${id}` + `&include[]=id&exclude[]=*`, 0, 99999)
        .map(data => data['kegg_pathways'].length)
        .catch(() => {
          console.log('error occur in herbId to pathaway number');
          return empty();
        });
    }
  }
}
