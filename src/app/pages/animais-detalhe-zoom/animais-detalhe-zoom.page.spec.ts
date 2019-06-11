import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisDetalheZoomPage } from './animais-detalhe-zoom.page';

describe('AnimaisDetalheZoomPage', () => {
  let component: AnimaisDetalheZoomPage;
  let fixture: ComponentFixture<AnimaisDetalheZoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimaisDetalheZoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaisDetalheZoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
