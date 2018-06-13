import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionCompoundTableComponent} from './prescription-compound-table.component';

describe('PrescriptionCompoundTableComponent', () => {
  let component: PrescriptionCompoundTableComponent;
  let fixture: ComponentFixture<PrescriptionCompoundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionCompoundTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionCompoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
