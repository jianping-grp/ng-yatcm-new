import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CompoundHerbTableComponent} from './compound-herb-table.component';

describe('CompoundHerbTableComponent', () => {
  let component: CompoundHerbTableComponent;
  let fixture: ComponentFixture<CompoundHerbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundHerbTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundHerbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
