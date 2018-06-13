import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionNetworkComponent} from './prescription-network.component';

describe('PrescriptionNetworkComponent', () => {
  let component: PrescriptionNetworkComponent;
  let fixture: ComponentFixture<PrescriptionNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionNetworkComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
