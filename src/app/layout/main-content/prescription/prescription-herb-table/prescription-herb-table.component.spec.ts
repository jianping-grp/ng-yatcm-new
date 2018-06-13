import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrescriptionHerbTableComponent} from './prescription-herb-table.component';

describe('PrescriptionHerbTableComponent', () => {
  let component: PrescriptionHerbTableComponent;
  let fixture: ComponentFixture<PrescriptionHerbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionHerbTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionHerbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
