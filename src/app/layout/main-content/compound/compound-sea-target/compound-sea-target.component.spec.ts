import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundSeaTargetComponent} from "./compound-sea-target.component";

describe('CompoundSeaTargetComponent', () => {
  let component: CompoundSeaTargetComponent;
  let fixture: ComponentFixture<CompoundSeaTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundSeaTargetComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundSeaTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
