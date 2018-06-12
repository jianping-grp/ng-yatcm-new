import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CompoundDiseaseTableComponent} from './compound-disease-table.component';

describe('CompoundDiseaseTableComponent', () => {
  let component: CompoundDiseaseTableComponent;
  let fixture: ComponentFixture<CompoundDiseaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundDiseaseTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundDiseaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
