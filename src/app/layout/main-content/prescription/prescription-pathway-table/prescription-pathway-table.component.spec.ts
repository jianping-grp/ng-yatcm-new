import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionPathwayTableComponent} from './prescription-pathway-table.component';

describe('PrescriptionPathwayTableComponent', () => {
  let component: PrescriptionPathwayTableComponent;
  let fixture: ComponentFixture<PrescriptionPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionPathwayTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
