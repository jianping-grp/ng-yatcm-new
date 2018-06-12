import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbPrescriptionTableComponent} from "./herb-prescription-table.component";

describe('HerbPrescriptionTableComponent', () => {
  let component: HerbPrescriptionTableComponent;
  let fixture: ComponentFixture<HerbPrescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbPrescriptionTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbPrescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
