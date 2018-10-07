import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {REST_HOST} from '../../../../setting';
import {RestService} from '../../../../services/rest/rest.service';

@Component({
  selector: 'app-sea',
  templateUrl: './sea.component.html',
  styleUrls: ['./sea.component.css']
})

export class SeaComponent implements OnInit {
  inputFile: File;
  chemicalScreeningForm: FormGroup;

  constructor(private rest: RestService) {
  }


  public uploder: FileUploader = new FileUploader({
    url: `${REST_HOST}/bulk-target-prediction/`,
    method: 'POST',
    itemAlias: 'structure_file'
  });


  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.chemicalScreeningForm = new FormGroup({
      queryFile: new FormControl('',),
      email: new FormControl('', [Validators.required, Validators.email]),
      // target: new FormControl('All', Validators.required)
    });
  }

  get queryFile() {
    return this.chemicalScreeningForm.get('queryFile');
  }

  get email() {
    return this.chemicalScreeningForm.get('email');
  }


  fileChange(event: any) {
    this.inputFile = event.target.files[0];
    this.fileAlert();
  }

  fileAlert() {
    const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
    const b = this.inputFile.name.lastIndexOf('.smi');
    if (a + b < 0) {
      alert('Please submit MDL sdf or SMILES format file!');
    } else if (this.inputFile.size > 41943040) {
      alert('please submit less than 40M file!');
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
    const form = this.chemicalScreeningForm.value;
    const emailAddress = form.email;
    const targetChemblId = form.target;
    this.uploder.setOptions({
      additionalParameter: {
        'email_addr': emailAddress,
      }
    });
    console.log(this.uploder, targetChemblId);
    this.uploder.queue[0].onSuccess = function (response, status, headers) {
      if (status === 200) {
        const temRes = JSON.parse(response);
        // console.log('response', temRes);
        alert('File Submission Successful! The prediction result will be sent to your email.');
      } else {
        alert('File Submission Failed. Please resubmit the query file!');
      }
    };
    this.uploder.queue[0].upload();
    // this.rebuildForm();
  }

  rebuildForm() {
    this.chemicalScreeningForm.reset({
      target: 'All',
    });
  }

}

