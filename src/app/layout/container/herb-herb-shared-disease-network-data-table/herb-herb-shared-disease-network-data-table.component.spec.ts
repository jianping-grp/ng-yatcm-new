import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbHerbSharedDiseaseNetworkDataTableComponent } from './herb-herb-shared-disease-network-data-table.component';

describe('HerbHerbSharedDiseaseNetworkDataTableComponent', () => {
  let component: HerbHerbSharedDiseaseNetworkDataTableComponent;
  let fixture: ComponentFixture<HerbHerbSharedDiseaseNetworkDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbSharedDiseaseNetworkDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbSharedDiseaseNetworkDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
