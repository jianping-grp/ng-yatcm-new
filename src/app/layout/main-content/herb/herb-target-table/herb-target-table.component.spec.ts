import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbTargetTableComponent} from './herb-target-table.component';

describe('HerbTargetTableComponent', () => {
  let component: HerbTargetTableComponent;
  let fixture: ComponentFixture<HerbTargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbTargetTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbTargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
