import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PherbPherbSharedTargetListComponent } from './pherb-pherb-shared-target-list.component';

describe('PherbPherbSharedTargetListComponent', () => {
  let component: PherbPherbSharedTargetListComponent;
  let fixture: ComponentFixture<PherbPherbSharedTargetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PherbPherbSharedTargetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PherbPherbSharedTargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
