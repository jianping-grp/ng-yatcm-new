import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TargetCompoundTableComponent} from './target-compound-table.component';

describe('TargetCompoundTableComponent', () => {
  let component: TargetCompoundTableComponent;
  let fixture: ComponentFixture<TargetCompoundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetCompoundTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetCompoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
