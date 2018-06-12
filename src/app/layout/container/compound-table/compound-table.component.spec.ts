import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompoundTableComponent} from './compound.table.component';

describe('CompoundTableComponent', () => {
  let component: CompoundTableComponent;
  let fixture: ComponentFixture<CompoundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
