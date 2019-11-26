import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsavoirPlusComponent } from './ensavoir-plus.component';

describe('EnsavoirPlusComponent', () => {
  let component: EnsavoirPlusComponent;
  let fixture: ComponentFixture<EnsavoirPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsavoirPlusComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsavoirPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
