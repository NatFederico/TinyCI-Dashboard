import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPartialComponent } from './header-partial.component';

describe('HeaderPartialComponent', () => {
  let component: HeaderPartialComponent;
  let fixture: ComponentFixture<HeaderPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
