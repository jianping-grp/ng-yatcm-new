import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundPrescriptionTableComponent} from "./compound-prescription-table.component";

describe('CompoundPrescriptionTableComponent', () => {
  let component: CompoundPrescriptionTableComponent;
  let fixture: ComponentFixture<CompoundPrescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundPrescriptionTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundPrescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
