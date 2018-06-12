import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbDiseaseTableComponent} from "./herb-disease-table.component";

describe('HerbDiseaseTableComponent', () => {
  let component: HerbDiseaseTableComponent;
  let fixture: ComponentFixture<HerbDiseaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbDiseaseTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbDiseaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
