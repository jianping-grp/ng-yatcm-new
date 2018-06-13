import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PathwayProteinDetailComponent} from './pathway-protein-detail.component';

describe('PathwayProteinDetailComponent', () => {
  let component: PathwayProteinDetailComponent;
  let fixture: ComponentFixture<PathwayProteinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayProteinDetailComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayProteinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
