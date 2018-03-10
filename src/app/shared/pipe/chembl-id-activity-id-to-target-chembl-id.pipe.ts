import {Pipe, PipeTransform} from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import 'rxjs/add/operator/catch';

@Pipe({
  name : 'getTargetChemblId'
})

export class ChemblIdActivityIdToTargetChemblIdPipe implements PipeTransform {
  constructor(private rest: RestService) {

  }

  transform(activityId: number | string, chemblId: number | string): Observable<string> {
   return  this.rest.getDataList(`chemblrelatedtargets/?filter{chembl_set.id}=${chemblId}` +
      `&filter{chembl_set.activities.id}=${activityId}`, 0, 9999)
      .map(data => data['ch_embl_related_targets'][0]['chembl_id'])
      .catch(() => {
     console.log('error occur in chemblId and activityId to targetChemblId');
      return empty();
});

  }
}
