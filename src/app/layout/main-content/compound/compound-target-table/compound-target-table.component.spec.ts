import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundTargetTableComponent} from './compound-target-table.component';

describe('CompoundTargetTableComponent', () => {
  let component: CompoundTargetTableComponent;
  let fixture: ComponentFixture<CompoundTargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundTargetTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundTargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
