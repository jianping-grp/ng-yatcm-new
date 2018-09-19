import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseEnrichPathwayComponent } from './disease-enrich-pathway.component';

describe('DiseaseEnrichPathwayComponent', () => {
  let component: DiseaseEnrichPathwayComponent;
  let fixture: ComponentFixture<DiseaseEnrichPathwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseEnrichPathwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseEnrichPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
