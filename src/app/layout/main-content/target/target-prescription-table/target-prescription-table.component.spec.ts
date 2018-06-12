import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TargetPrescriptionTableComponent} from "./target-prescription-table.component";

describe('TargetPrescriptionTableComponent', () => {
  let component: TargetPrescriptionTableComponent;
  let fixture: ComponentFixture<TargetPrescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetPrescriptionTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPrescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
