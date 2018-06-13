import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundStructureSearchComponent} from './compound-structure-search.component';

describe('CompoundStructureSearchComponent', () => {
  let component: CompoundStructureSearchComponent;
  let fixture: ComponentFixture<CompoundStructureSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundStructureSearchComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundStructureSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
