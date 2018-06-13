import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionDiseaseTableComponent} from './prescription-disease-table.component';

describe('PrescriptionDiseaseTableComponent', () => {
  let component: PrescriptionDiseaseTableComponent;
  let fixture: ComponentFixture<PrescriptionDiseaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionDiseaseTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionDiseaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
