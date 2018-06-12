import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DiseasePrescriptionTableComponent} from "./disease-prescription-table.component";

describe('DiseasePrescriptionTableComponent', () => {
  let component: DiseasePrescriptionTableComponent;
  let fixture: ComponentFixture<DiseasePrescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiseasePrescriptionTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasePrescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
