import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DiseaseCompoundTableComponent} from './disease-compound-table.component';

describe('DiseaseCompoundTableComponent', () => {
  let component: DiseaseCompoundTableComponent;
  let fixture: ComponentFixture<DiseaseCompoundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseCompoundTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseCompoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
