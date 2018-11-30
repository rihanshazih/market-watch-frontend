import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSelectorComponent } from './structure-selector.component';

describe('StructureSelectorComponent', () => {
  let component: StructureSelectorComponent;
  let fixture: ComponentFixture<StructureSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
