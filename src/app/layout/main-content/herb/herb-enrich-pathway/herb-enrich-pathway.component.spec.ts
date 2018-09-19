import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbEnrichPathwayComponent } from './herb-enrich-pathway.component';

describe('HerbEnrichPathwayComponent', () => {
  let component: HerbEnrichPathwayComponent;
  let fixture: ComponentFixture<HerbEnrichPathwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbEnrichPathwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbEnrichPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
