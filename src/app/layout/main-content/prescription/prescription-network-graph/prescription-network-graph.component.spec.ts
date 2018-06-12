import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionNetworkGraphComponent} from "./prescription-network-graph.component";

describe('PrescriptionNetworkGraphComponent', () => {
  let component: PrescriptionNetworkGraphComponent;
  let fixture: ComponentFixture<PrescriptionNetworkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionNetworkGraphComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
