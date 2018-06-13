import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionTargetTableComponent} from './prescription-target-table.component';

describe('PrescriptionTargetTableComponent', () => {
  let component: PrescriptionTargetTableComponent;
  let fixture: ComponentFixture<PrescriptionTargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionTargetTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionTargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
