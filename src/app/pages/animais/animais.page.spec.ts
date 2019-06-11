import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisPage } from './animais.page';

describe('AnimaisPage', () => {
  let component: AnimaisPage;
  let fixture: ComponentFixture<AnimaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
