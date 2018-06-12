import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RelateChemblMoleculeComponent} from "./relate-chembl-molecule.component";

describe('RelateChemblMoleculeComponent', () => {
  let component: RelateChemblMoleculeComponent;
  let fixture: ComponentFixture<RelateChemblMoleculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelateChemblMoleculeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelateChemblMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
