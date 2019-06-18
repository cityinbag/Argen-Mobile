import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpresaPage } from './add-empresa.page';

describe('AddEmpresaPage', () => {
  let component: AddEmpresaPage;
  let fixture: ComponentFixture<AddEmpresaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpresaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
