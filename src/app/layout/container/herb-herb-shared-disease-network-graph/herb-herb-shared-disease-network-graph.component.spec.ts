import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { HerbHerbSharedDiseaseNetworkGraphComponent } from './herb-herb-shared-disease-network-graph.component';

describe('HerbHerbSharedDiseaseNetworkGraphComponent', () => {
  let component: HerbHerbSharedDiseaseNetworkGraphComponent;
  let fixture: ComponentFixture<HerbHerbSharedDiseaseNetworkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbSharedDiseaseNetworkGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbSharedDiseaseNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
