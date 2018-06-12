import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {KeggMapComponent} from "./kegg-map.component";

describe('KeggMapComponent', () => {
  let component: KeggMapComponent;
  let fixture: ComponentFixture<KeggMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeggMapComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeggMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
