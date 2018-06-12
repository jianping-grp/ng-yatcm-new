import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundNetworkComponent} from './compound-network.component';

describe('CompoundNetworkComponent', () => {
  let component: CompoundNetworkComponent;
  let fixture: ComponentFixture<CompoundNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundNetworkComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
