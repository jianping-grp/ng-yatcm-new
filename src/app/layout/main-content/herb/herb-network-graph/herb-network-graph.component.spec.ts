import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbNetworkGraphComponent} from './herb-network-graph.component';

describe('HerbNetworkGraphComponent', () => {
  let component: HerbNetworkGraphComponent;
  let fixture: ComponentFixture<HerbNetworkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbNetworkGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
