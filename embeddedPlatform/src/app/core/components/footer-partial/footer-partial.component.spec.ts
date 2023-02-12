import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPartialComponent } from './footer-partial.component';

describe('FooterPartialComponent', () => {
  let component: FooterPartialComponent;
  let fixture: ComponentFixture<FooterPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
