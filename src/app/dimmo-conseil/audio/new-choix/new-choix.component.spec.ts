import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChoixComponent } from './new-choix.component';

describe('NewChoixComponent', () => {
  let component: NewChoixComponent;
  let fixture: ComponentFixture<NewChoixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChoixComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
