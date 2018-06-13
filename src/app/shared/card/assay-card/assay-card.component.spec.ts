import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AssayCardComponent} from './assay-card.component';

describe('AssayCardComponent', () => {
  let component: AssayCardComponent;
  let fixture: ComponentFixture<AssayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssayCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
