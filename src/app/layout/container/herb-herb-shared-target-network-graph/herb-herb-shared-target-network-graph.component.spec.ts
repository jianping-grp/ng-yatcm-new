import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HerbHerbSharedTargetNetworkGraphComponent} from './herb-herb-shared-target-network-graph.component';

describe('HerbHerbSharedTargetNetworkGraphComponent', () => {
  let component: HerbHerbSharedTargetNetworkGraphComponent;
  let fixture: ComponentFixture<HerbHerbSharedTargetNetworkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbSharedTargetNetworkGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbSharedTargetNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
