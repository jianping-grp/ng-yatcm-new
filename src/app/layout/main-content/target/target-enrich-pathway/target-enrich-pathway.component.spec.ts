import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEnrichPathwayComponent } from './target-enrich-pathway.component';

describe('TargetEnrichPathwayComponent', () => {
  let component: TargetEnrichPathwayComponent;
  let fixture: ComponentFixture<TargetEnrichPathwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetEnrichPathwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEnrichPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
