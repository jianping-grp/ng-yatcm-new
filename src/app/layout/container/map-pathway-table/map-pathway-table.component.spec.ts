import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPathwayTableComponent } from './map-pathway-table.component';

describe('MapPathwayTableComponent', () => {
  let component: MapPathwayTableComponent;
  let fixture: ComponentFixture<MapPathwayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPathwayTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPathwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
