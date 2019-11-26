import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritsComponent } from './inscrits.component';

describe('InscritsComponent', () => {
  let component: InscritsComponent;
  let fixture: ComponentFixture<InscritsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscritsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
