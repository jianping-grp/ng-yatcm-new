import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HerbDetailComponent} from './herb-detail.component';

describe('HerbDetailComponent', () => {
  let component: HerbDetailComponent;
  let fixture: ComponentFixture<HerbDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerbDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
