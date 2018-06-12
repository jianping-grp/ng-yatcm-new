import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HerbTableComponent} from './herb-table.component';

describe('HerbTableComponent', () => {
  let component: HerbTableComponent;
  let fixture: ComponentFixture<HerbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
