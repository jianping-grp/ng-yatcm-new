import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from '../../../../services/global/global.service';
import {PrescriptionListParamsType} from '../../../../yatcm/enum/prescription-list-param-type.enum';
import {HerbListParamsType} from '../../../../yatcm/enum/herb-list-param-type.enum';
import {CompoundListParamsType} from '../../../../yatcm/enum/compound-list-param-type.enum';
import {TargetListParamsType} from '../../../../yatcm/enum/target-list-param-type.enum';
import {DiseaseListParamsType} from '../../../../yatcm/enum/disease-list-param-type.enum';
import {PathwayListParamsType} from '../../../../yatcm/enum/pathway-list-param-type.enum';
import {Router} from '@angular/router';
import {JsmeComponent} from '../../../../shared/jsme/jsme/jsme.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(JsmeComponent)
  private jsme: JsmeComponent;
  structureTypeList = ['Structure', 'Substructure'];
  structureType = this.structureTypeList[0];
  similarity = 0.9;
  prescriptionSearchTypeList = [
    {inputType: 'English name', value: 'yupingfeng powder'},
    {inputType: 'Chinese name', value: '玉屏风散'},
    {inputType: 'Phonetic name', value: 'yu ping feng san'}
  ];
  prescriptionSelectedType = this.prescriptionSearchTypeList[0].inputType;
  prescriptionKeyword = this.prescriptionSearchTypeList[0].value;
  herbSearchTypeList = [
    {inputType: 'English name', value: 'Glycyrrhiza Uralensis'},
    {inputType: 'Chinese name', value: '甘草'},
    {inputType: 'Phonetic name', value: 'GAN CAO'}
  ];
  herbSelectedType = this.herbSearchTypeList[0].inputType;
  herbKeyword = this.herbSearchTypeList[0].value;

  compoundSearchTypeList = [
    {inputType: 'English name', value: 'artemisinin'},
    {inputType: 'Formula', value: 'C15H22O5'},
    {inputType: 'CAS', value: '63968-64-9'},
    {inputType: 'CID', value: '68827'}
  ];
  compoundSelectedType = this.compoundSearchTypeList[0].inputType;
  compoundKeyword = this.compoundSearchTypeList[0].value;
  targetSearchTypeList = [
    {inputType: 'Target name', value: 'Acetylcholinesterase'},
    {inputType: 'Uniprot name', value: 'P22303'},
    {inputType: 'Gene name', value: 'ACHE'}
  ];
  targetSelectedType = this.targetSearchTypeList[0].inputType;
  targetKeyword = this.targetSearchTypeList[0].value;
  pathwaySearchTypeList = [
    {inputType: 'Pathway name', value: 'Citrate cycle (TCA cycle)'},
    {inputType: 'KEGG ID', value: 'map00020'}
  ];
  pathwaySelectedType = this.pathwaySearchTypeList[0].inputType;
  pathwayKeyword = this.pathwaySearchTypeList[0].value;
  diseaseSearchTypeList = [
    {inputType: 'Disease name', value: 'Depression'}
  ];
  diseaseSelectedType = this.diseaseSearchTypeList[0].inputType;
  diseaseKeyword = this.diseaseSearchTypeList[0].value;

  constructor(private globalService: GlobalService,
              private router: Router) { }
  ngOnInit() { }

  prescriptionSearchTypeChange(selectedType: string) {
    this.prescriptionKeyword = this.prescriptionSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  prescriptionSubmit() {
    this.prescriptionKeyword = this.prescriptionKeyword.trim();
    if (this.prescriptionSelectedType === 'Chinese name') {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.chinese_name, {chineseName: this.prescriptionKeyword});
    } else if (this.prescriptionSelectedType === 'English name') {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.english_name, {englishName: this.prescriptionKeyword});
    } else if (this.prescriptionSelectedType === 'Phonetic name') {
      this.globalService.gotoPrescriptionList(PrescriptionListParamsType.pinyin_name, {phoneticName: this.prescriptionKeyword});
    }
  }

 herbSearchTypeChange(selectedType: string) {
    this.herbKeyword = this.herbSearchTypeList.find(el => el.inputType === selectedType).value;
 }

  herbSubmit() {
    this.herbKeyword = this.herbKeyword.trim();
    if (this.herbSelectedType === 'Chinese name') {
      this.globalService.gotoHerbList(HerbListParamsType.chinese_name, {chineseName: this.herbKeyword});
    } else if (this.herbSelectedType === 'English name') {
      this.globalService.gotoHerbList(HerbListParamsType.english_name, {englishName: this.herbKeyword});
    } else if (this.herbSelectedType === 'Phonetic name') {
      this.globalService.gotoHerbList(HerbListParamsType.pinyin_name, {phoneticName: this.herbKeyword});

    }
  }

  compoundSearchTypeChange(selectedType: string) {
    this.compoundKeyword = this.compoundSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  compoundSubmit() {
    this.compoundKeyword = this.compoundKeyword.trim();
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

  targetSearchTypeChange(selectedType: string) {
    this.targetKeyword = this.targetSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  targetSubmit() {
    this.targetKeyword = this.targetKeyword.trim();
    if (this.targetSelectedType === 'Target name') {
      this.globalService.gotoTargetList(TargetListParamsType.target_name, {targetName: this.targetKeyword});
      } else if (this.targetSelectedType === 'Uniprot name') {
      this.globalService.gotoTargetList(TargetListParamsType.uniprot_name, {uniprotName: this.targetKeyword});
    } else if (this.targetSelectedType === 'Gene name') {
      this.globalService.gotoTargetList(TargetListParamsType.gene_name, {geneName: this.targetKeyword});
    }
  }

  diseaseSubmit() {
    this.diseaseKeyword = this.diseaseKeyword.trim();
    if (this.diseaseSelectedType === 'Disease name') {
      this.globalService.gotoDiseaseList(DiseaseListParamsType.disease_name, {diseaseName: this.diseaseKeyword});
    } else if (this.diseaseSelectedType === 'Synonym') {
      this.globalService.gotoDiseaseList(DiseaseListParamsType.synonyms, {synonym: this.diseaseKeyword});
    }
  }

  pathwaySearchTypeChange(selectedType: string) {
    this.pathwayKeyword = this.pathwaySearchTypeList.find(el => el.inputType === selectedType).value;
  }

  pathwaySubmit() {
    this.pathwayKeyword = this.pathwayKeyword.trim();
    if (this.pathwaySelectedType === 'Pathway name') {
      this.globalService.gotoPathwayList(PathwayListParamsType.pathway_name, {pathwayName: this.pathwayKeyword});
    } else if (this.pathwaySelectedType === 'KEGG ID') {
      this.globalService.gotoPathwayList(PathwayListParamsType.kegg_id, {keggId: this.pathwayKeyword});
    }
  }

  onSubmit() {
    let queryParams = {};
    if (this.structureType === 'Structure') {
      queryParams = {
        structureType: 'structure',
        smiles: this.jsme.smiles,
        similarity: this.similarity
      };
      } else if (this.structureType === 'Substructure') {
      queryParams = {
        structureType: 'substructure',
        smiles: this.jsme.smiles,
      };
    }
    this.router.navigate(['compound/search'], {queryParams: queryParams});
  }



}
