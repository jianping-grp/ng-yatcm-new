import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PherbPherbSharedDiseaseListComponent } from './pherb-pherb-shared-disease-list.component';

describe('PherbPherbSharedDiseaseListComponent', () => {
  let component: PherbPherbSharedDiseaseListComponent;
  let fixture: ComponentFixture<PherbPherbSharedDiseaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PherbPherbSharedDiseaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PherbPherbSharedDiseaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
