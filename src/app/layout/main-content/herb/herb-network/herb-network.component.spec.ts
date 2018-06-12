import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbNetworkComponent} from "./herb-network.component";

describe('HerbNetworkComponent', () => {
  let component: HerbNetworkComponent;
  let fixture: ComponentFixture<HerbNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbNetworkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
