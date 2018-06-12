import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DiseasePathwayTableComponent} from "./disease-pathway-table.component";

describe('DiseasePathwayTableComponent', () => {
  let component: DiseasePathwayTableComponent;
  let fixture: ComponentFixture<DiseasePathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasePathwayTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasePathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
