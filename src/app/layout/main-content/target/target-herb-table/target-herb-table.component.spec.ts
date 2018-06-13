import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TargetHerbTableComponent} from './target-herb-table.component';

describe('TargetHerbTableComponent', () => {
  let component: TargetHerbTableComponent;
  let fixture: ComponentFixture<TargetHerbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetHerbTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetHerbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
