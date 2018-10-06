
import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {Target} from '../../../glaucoma/models/target';
import {FileUploader} from 'ng2-file-upload';
import {RestService} from "../../../../services/rest/rest.service";


@Component({
  selector: 'app-sea',
  templateUrl: './sea.component.html',
  styleUrls: ['./sea.component.css']
})

export class SeaComponent implements OnInit {
  // targets: Target[] = [];
  inputFile: File;
  seaForm: FormGroup;

  constructor(private rest: RestService) {
  }


  public uploder: FileUploader = new FileUploader({
    url: `/bulk-target-prediction/`,
    method: "POST",
    itemAlias: "structure_file"
  });


  ngOnInit() {
    this.createForm();
    this._getTargetName();
  }

  private _getTargetName() {
    // this.rest.getDataList(`target/?exclude[]=*&include[]=protein_description` +
    //   `&include[]=chemblid&sort[]=protein_description`, 0, 999999)
    //   .subscribe(data => {
    //     this.targets = data['targets'];
    //     this.targets.unshift({ chemblid: 'All', protein_description: 'All'});
    //     console.log(this.targets.length, this.targets)
    //   })
  }

  createForm() {
    this.seaForm = new FormGroup({
      queryFile: new FormControl(''),
      // email: new FormControl('', [Validators.required, Validators.email]),
      // target: new FormControl('All', Validators.required)
    });
  }

  get queryFile() {
    return this.seaForm.get('queryFile');
  }

  get email() {
    return this.seaForm.get('email');
  }

  get target() {
    return this.seaForm.get('target');
  }

  fileChange(event: any) {
    console.log("file:", event); //todo delete
    this.inputFile = event.target.files[0];
    this.fileAlert();
  }

  fileAlert() {
    const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
    const b = this.inputFile.name.lastIndexOf('.smi');
    if (a + b < 0) {
      alert('Please submit MDL sdf or SMILES format file!')
    } else if (this.inputFile.size > 41943040) {
      alert('please submit less than 40M file!')
    }
  }

  onSubmit() {
    if (!this.inputFile) {
      alert('Please submit MDL sdf or SMILES format file!');
    } else if (this.inputFile) {
      const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
      const b = this.inputFile.name.lastIndexOf('.smi');
      if (a + b < 0) {
        alert('Please submit MDL sdf or SMILES format file!');
      } else if (this.inputFile.size > 41943040) {
        alert('please submit less than 40M file!');
      } else {
        this.uploaderFile();
      }
    }

  }

  uploaderFile() {
    const form = this.seaForm.value;
    const emailAddress = form.email;
    const targetChemblId = form.target;
    this.uploder.setOptions({
      additionalParameter: {
        'email_addr': emailAddress,
        'prediction_type': targetChemblId
      }
    });
    console.log(this.uploder, targetChemblId);
    this.uploder.queue[0].onSuccess = function (response, status, headers) {
      if (status === 200) {
        let temRes = JSON.parse(response);
        // console.log('response', temRes);
        alert('File Submission Successful! The prediction result will be sent to your email.');
      } else {
        alert('File Submission Failed. Please resubmit the query file!')
      }
    };
    this.uploder.queue[0].upload();
    this.rebuildForm();
  }

  rebuildForm() {
    this.seaForm.reset({
      target: 'All',
    })
  }

}

