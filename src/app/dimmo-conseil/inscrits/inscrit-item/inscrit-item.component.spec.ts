import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritItemComponent } from './inscrit-item.component';

describe('InscritItemComponent', () => {
  let component: InscritItemComponent;
  let fixture: ComponentFixture<InscritItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscritItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
