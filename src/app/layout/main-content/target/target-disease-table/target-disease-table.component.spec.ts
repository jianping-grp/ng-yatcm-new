import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TargetDiseaseTableComponent} from './target-disease-table.component';

describe('TargetDiseaseTableComponent', () => {
  let component: TargetDiseaseTableComponent;
  let fixture: ComponentFixture<TargetDiseaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetDiseaseTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDiseaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
