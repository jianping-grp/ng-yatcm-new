import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbCompoundTableComponent} from "./herb-compound-table.component";

describe('HerbCompoundTableComponent', () => {
  let component: HerbCompoundTableComponent;
  let fixture: ComponentFixture<HerbCompoundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbCompoundTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbCompoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
