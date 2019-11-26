import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimmoComponent } from './dimmo.component';

describe('DimmoComponent', () => {
  let component: DimmoComponent;
  let fixture: ComponentFixture<DimmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimmoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
