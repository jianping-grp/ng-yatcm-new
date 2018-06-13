import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DiseaseHerbTableComponent} from './disease-herb-table.component';

describe('DiseaseHerbTableComponent', () => {
  let component: DiseaseHerbTableComponent;
  let fixture: ComponentFixture<DiseaseHerbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseHerbTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHerbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
