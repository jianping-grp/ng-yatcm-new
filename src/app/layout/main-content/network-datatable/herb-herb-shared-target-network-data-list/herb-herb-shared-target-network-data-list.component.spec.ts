import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HerbHerbSharedTargetNetworkDataListComponent} from './herb-herb-shared-target-network-data-list.component';

describe('HerbHerbSharedTargetNetworkDataListComponent', () => {
  let component: HerbHerbSharedTargetNetworkDataListComponent;
  let fixture: ComponentFixture<HerbHerbSharedTargetNetworkDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbSharedTargetNetworkDataListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbSharedTargetNetworkDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
