import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {YatcmSimilarityKeggCompoundCardComponent} from './yatcm-similarity-kegg-compound-card.component';

describe('YatcmSimilarityKeggCompoundCardComponent', () => {
  let component: YatcmSimilarityKeggCompoundCardComponent;
  let fixture: ComponentFixture<YatcmSimilarityKeggCompoundCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YatcmSimilarityKeggCompoundCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YatcmSimilarityKeggCompoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
