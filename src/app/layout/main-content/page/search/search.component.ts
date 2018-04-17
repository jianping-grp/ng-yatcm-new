import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../../services/global/global.service';
import {PrescriptionListParamsType} from '../../../../yatcm/enum/prescription-list-param-type.enum';
import {HerbListParamsType} from '../../../../yatcm/enum/herb-list-param-type.enum';
import {CompoundListParamsType} from '../../../../yatcm/enum/compound-list-param-type.enum';
import {TargetListParamsType} from '../../../../yatcm/enum/target-list-param-type.enum';
import {DiseaseListParamsType} from '../../../../yatcm/enum/disease-list-param-type.enum';
import {PathwayListParamsType} from '../../../../yatcm/enum/pathway-list-param-type.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pstKeyword = '';
  herbKeyword = '';
  inputTypeList = ['Chinese name', 'English name', 'Phonetic name'];
  pstSelectedType = this.inputTypeList[0]; // pst is Prescription
  herbSelectedType = this.inputTypeList[0];
  targetKeyword = '';
  targetInputTypeList = ['Target name', 'Uniprot name', 'Gene name'];
  targetSelectedType = this.targetInputTypeList[0];
  compoundInputTypeList = ['English name', 'Formula', 'CID', 'CAS'];
  compoundSelectedType = this.compoundInputTypeList[0];
  compoundKeyword = '';
  // diseaseInputTypeList = ['Disease name', 'Synonym'];
  diseaseInputTypeList = [
    {value: 'Disease name', placeholder: 'Nail Disorder, Nonsyndromic Congenital, 10 Ndnc10'},
    {value: 'Synonyms', placeholder: 'Claw-Shaped Nails Onychauxis, Hyponychia, And Onycholysis'}
  ];
  diseaseSelectedType = this.diseaseInputTypeList[0];
  diseaseKeyword: string;
  pathwayInputTypeList = ['Pathway name', 'KEGG ID'];
  pathwaySelectedType = this.pathwayInputTypeList[0];
  pathwayKeyword = ``;
  structureTypeList = ['Structure', 'Substructure'];
  structureType = this.structureTypeList[0];
  similarity = 0.9;
  constructor(private globalService: GlobalService,
              private router: Router) { }
  ngOnInit() { }

  pstSubmit() {
    if (this.pstSelectedType === 'Chinese name') {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.chinese_name, {chineseName: this.pstKeyword});
    } else if (this.pstSelectedType === 'English name') {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.english_name, {englishName: this.pstKeyword});
    } else if (this.pstSelectedType === 'Phonetic name') {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.pinyin_name, {phoneticName: this.pstKeyword});
    }
  }

  herbSubmit() {
    if (this.herbSelectedType === 'Chinese name') {
      this.globalService.gotoHerbList(HerbListParamsType.chinese_name, {chineseName: this.herbKeyword});
    } else if (this.herbSelectedType === 'English name') {
      this.globalService.gotoHerbList(HerbListParamsType.english_name, {englishName: this.herbKeyword});
    } else if (this.herbSelectedType === 'Phonetic name') {
      this.globalService.gotoHerbList(HerbListParamsType.pinyin_name, {phoneticName: this.herbKeyword});

    }
  }

  compoundSubmit() {
    if (this.compoundSelectedType === 'English name') {
      this.globalService.gotoCompoundList(CompoundListParamsType.english_name, {englishName: this.compoundKeyword});
    } else if (this.compoundSelectedType === 'Formula') {
      this.globalService.gotoCompoundList(CompoundListParamsType.formula, {formula: this.compoundKeyword});
    } else if (this.compoundSelectedType === 'CAS') {
      this.globalService.gotoCompoundList(CompoundListParamsType.cas, {cas: this.compoundKeyword});
    } else if (this.compoundSelectedType === 'CID') {
      this.globalService.gotoCompoundList(CompoundListParamsType.cid, {cid: this.compoundKeyword});
    }
  }

  targetSubmit() {
    if (this.targetSelectedType === 'Target name') {
      this.globalService.gotoTargetList(TargetListParamsType.target_name, {targetName: this.targetKeyword});
      } else if (this.targetSelectedType === 'Uniprot name') {
      this.globalService.gotoTargetList(TargetListParamsType.uniprot_name, {uniprotName: this.targetKeyword});
    } else if (this.targetSelectedType === 'Gene name') {
      this.globalService.gotoTargetList(TargetListParamsType.gene_name, {geneName: this.targetKeyword});
    }
  }

  diseaseSubmit() {
    if (this.diseaseSelectedType.value === 'Disease name') {
      this.globalService.gotoDiseaseList(DiseaseListParamsType.disease_name, {diseaseName: this.diseaseKeyword});
    } else if (this.diseaseSelectedType.value === 'Synonym') {
      this.globalService.gotoDiseaseList(DiseaseListParamsType.synonyms, {synonym: this.diseaseKeyword});
    }
  }

  pathwaySubmit() {
    if (this.pathwaySelectedType === 'Pathway name') {
      this.globalService.gotoPathwayList(PathwayListParamsType.pathway_name, {pathwayName: this.pathwayKeyword});
    } else if (this.pathwaySelectedType === 'KEGG ID') {
      this.globalService.gotoPathwayList(PathwayListParamsType.kegg_id, {keggId: this.pathwayKeyword});
    }
  }

  onSubmit(smiles: string) {
    let queryParams = {};
    if (this.structureType === 'Structure') {
      queryParams = {
        structureType: 'structure',
        smiles: smiles,
        similarity: this.similarity
      };
      } else if (this.structureType === 'Substructure') {
      queryParams = {
        structureType: 'substructure',
        smiles: smiles,
      };
    }
    this.router.navigate(['compound/search'], {queryParams: queryParams});
  }
}
