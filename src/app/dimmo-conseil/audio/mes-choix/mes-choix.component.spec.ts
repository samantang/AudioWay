import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesChoixComponent } from './mes-choix.component';

describe('MesChoixComponent', () => {
  let component: MesChoixComponent;
  let fixture: ComponentFixture<MesChoixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesChoixComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
