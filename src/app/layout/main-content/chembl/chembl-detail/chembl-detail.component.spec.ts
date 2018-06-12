import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChemblDetailComponent} from './chembl-detail.component';

describe('ChemblDetailComponent', () => {
  let component: ChemblDetailComponent;
  let fixture: ComponentFixture<ChemblDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemblDetailComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemblDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
