import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DiseaseTargetTableComponent} from "./disease-target-table.component";

describe('DiseaseTargetTableComponent', () => {
  let component: DiseaseTargetTableComponent;
  let fixture: ComponentFixture<DiseaseTargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiseaseTargetTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
