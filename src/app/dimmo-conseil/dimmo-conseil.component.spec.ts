import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimmoConseilComponent } from './dimmo-conseil.component';

describe('DimmoConseilComponent', () => {
  let component: DimmoConseilComponent;
  let fixture: ComponentFixture<DimmoConseilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimmoConseilComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimmoConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
