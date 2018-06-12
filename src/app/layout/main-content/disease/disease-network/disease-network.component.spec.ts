import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DiseaseNetworkComponent} from "./disease-network.component";

describe('DiseaseNetworkComponent', () => {
  let component: DiseaseNetworkComponent;
  let fixture: ComponentFixture<DiseaseNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseNetworkComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
