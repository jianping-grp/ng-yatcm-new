import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionEnrichPathwayTableComponent } from './prescription-enrich-pathway-table.component';

describe('PrescriptionEnrichPathwayTableComponent', () => {
  let component: PrescriptionEnrichPathwayTableComponent;
  let fixture: ComponentFixture<PrescriptionEnrichPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionEnrichPathwayTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionEnrichPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
