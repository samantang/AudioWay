import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NosGarantiesComponent } from './nos-garanties.component';

describe('NosGarantiesComponent', () => {
  let component: NosGarantiesComponent;
  let fixture: ComponentFixture<NosGarantiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosGarantiesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosGarantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
