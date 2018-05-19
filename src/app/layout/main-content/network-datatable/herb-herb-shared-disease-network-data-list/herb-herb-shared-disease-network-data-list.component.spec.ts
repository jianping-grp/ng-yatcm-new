import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbHerbSharedDiseaseNetworkDataListComponent } from './herb-herb-shared-disease-network-data-list.component';

describe('HerbHerbSharedDiseaseNetworkDataListComponent', () => {
  let component: HerbHerbSharedDiseaseNetworkDataListComponent;
  let fixture: ComponentFixture<HerbHerbSharedDiseaseNetworkDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbSharedDiseaseNetworkDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbSharedDiseaseNetworkDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
