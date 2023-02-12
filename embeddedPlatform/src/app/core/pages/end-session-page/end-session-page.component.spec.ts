import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndSessionPageComponent } from './end-session-page.component';

describe('CallbackPageComponent', () => {
  let component: EndSessionPageComponent;
  let fixture: ComponentFixture<EndSessionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndSessionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
