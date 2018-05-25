import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbHerbNetworkSharedPathwayListComponent } from './herb-herb-network-shared-pathway-list.component';

describe('HerbHerbNetworkSharedPathwayListComponent', () => {
  let component: HerbHerbNetworkSharedPathwayListComponent;
  let fixture: ComponentFixture<HerbHerbNetworkSharedPathwayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbHerbNetworkSharedPathwayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbHerbNetworkSharedPathwayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
