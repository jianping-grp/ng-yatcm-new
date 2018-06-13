import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ChemblRelatedTargetCardComponent} from './chembl-related-target-card.component';

describe('ChemblRelatedTargetCardComponent', () => {
  let component: ChemblRelatedTargetCardComponent;
  let fixture: ComponentFixture<ChemblRelatedTargetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemblRelatedTargetCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemblRelatedTargetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
