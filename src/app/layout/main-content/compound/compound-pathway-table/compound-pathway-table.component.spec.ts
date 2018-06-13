import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundPathwayTableComponent} from './compound-pathway-table.component';

describe('CompoundPathwayTableComponent', () => {
  let component: CompoundPathwayTableComponent;
  let fixture: ComponentFixture<CompoundPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundPathwayTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
