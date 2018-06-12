import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbPathwayTableComponent} from "./herb-pathway-table.component";

describe('HerbPathwayTableComponent', () => {
  let component: HerbPathwayTableComponent;
  let fixture: ComponentFixture<HerbPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbPathwayTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
