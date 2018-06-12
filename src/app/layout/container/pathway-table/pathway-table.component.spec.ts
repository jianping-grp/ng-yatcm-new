import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PathwayTableComponent} from './pathway-table.component';

describe('PathwayTableComponent', () => {
  let component: PathwayTableComponent;
  let fixture: ComponentFixture<PathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
