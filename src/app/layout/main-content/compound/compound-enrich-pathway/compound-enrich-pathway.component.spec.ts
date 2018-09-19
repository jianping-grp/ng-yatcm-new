import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundEnrichPathwayComponent } from './compound-enrich-pathway.component';

describe('CompoundEnrichPathwayComponent', () => {
  let component: CompoundEnrichPathwayComponent;
  let fixture: ComponentFixture<CompoundEnrichPathwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundEnrichPathwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundEnrichPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
