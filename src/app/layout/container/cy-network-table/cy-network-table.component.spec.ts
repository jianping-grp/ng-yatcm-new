import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyNetworkTableComponent } from './cy-network-table.component';

describe('CyNetworkTableComponent', () => {
  let component: CyNetworkTableComponent;
  let fixture: ComponentFixture<CyNetworkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyNetworkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyNetworkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
