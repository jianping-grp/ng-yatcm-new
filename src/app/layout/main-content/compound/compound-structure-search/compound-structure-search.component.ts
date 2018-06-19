import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-compound-search',
  templateUrl: './compound-structure-search.component.html',
  styleUrls: ['./compound-structure-search.component.css']
})
export class CompoundStructureSearchComponent implements OnInit {
  restUrl$: Observable<string>;
  smiles: string;
  structureType: string;
  body: object;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
   this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.smiles = params.get('smiles');
      this.structureType = params.get('structureType');
      if (this.structureType === 'structure') {
        const similarity = params.get('similarity');
        this.body = {
          smiles: this.smiles,
          similarity: similarity,
          substructure_search: 0
        };
      } else if (this.structureType === 'substructure') {
        this.body = {
          smiles: this.smiles,
          similarity: 0,
          substructure_search: 1
        };
      }
     this.restUrl$ = observableOf(`compoundsearch/search/?`);
    });
  }
}
