import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTargetOrPathwayListComponent } from './select-target-or-pathway-list.component';

describe('SelectTargetOrPathwayListComponent', () => {
  let component: SelectTargetOrPathwayListComponent;
  let fixture: ComponentFixture<SelectTargetOrPathwayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTargetOrPathwayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTargetOrPathwayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
