import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesChoixItemComponent } from './mes-choix-item.component';

describe('MesChoixItemComponent', () => {
  let component: MesChoixItemComponent;
  let fixture: ComponentFixture<MesChoixItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesChoixItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesChoixItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
