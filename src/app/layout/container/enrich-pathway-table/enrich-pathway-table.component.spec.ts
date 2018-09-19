import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrichPathwayTableComponent } from './enrich-pathway-table.component';

describe('EnrichPathwayTableComponent', () => {
  let component: EnrichPathwayTableComponent;
  let fixture: ComponentFixture<EnrichPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrichPathwayTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrichPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
