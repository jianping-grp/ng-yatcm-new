import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SpliceNetworkComponent} from "./splice-network.component";

describe('SpliceNetworkComponent', () => {
  let component: SpliceNetworkComponent;
  let fixture: ComponentFixture<SpliceNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpliceNetworkComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpliceNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
