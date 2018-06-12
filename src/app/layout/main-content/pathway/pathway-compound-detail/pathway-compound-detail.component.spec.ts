import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PathwayCompoundDetailComponent} from "./pathway-compound-detail.component";

describe('PathwayCompoundDetailComponent', () => {
  let component: PathwayCompoundDetailComponent;
  let fixture: ComponentFixture<PathwayCompoundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayCompoundDetailComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayCompoundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
