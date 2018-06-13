import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TargetPathwayTableComponent} from './target-pathway-table.component';

describe('TargetPathwayTableComponent', () => {
  let component: TargetPathwayTableComponent;
  let fixture: ComponentFixture<TargetPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetPathwayTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
