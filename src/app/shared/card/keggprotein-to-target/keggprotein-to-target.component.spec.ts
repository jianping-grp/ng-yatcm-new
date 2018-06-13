import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {KeggproteinToTargetComponent} from './keggprotein-to-target.component';

describe('KeggproteinToTargetComponent', () => {
  let component: KeggproteinToTargetComponent;
  let fixture: ComponentFixture<KeggproteinToTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeggproteinToTargetComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeggproteinToTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
