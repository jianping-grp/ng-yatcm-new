import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbHerbNetworkGraphComponent } from './herb-herb-shared-target-network-graph.component';

describe('HerbHerbNetworkGraphComponent', () => {
  let component: HerbHerbNetworkGraphComponent;
  let fixture: ComponentFixture<HerbHerbNetworkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbNetworkGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
