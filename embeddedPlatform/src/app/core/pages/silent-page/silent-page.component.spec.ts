import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentPageComponent } from './silent-page.component';

describe('SilentPageComponent', () => {
  let component: SilentPageComponent;
  let fixture: ComponentFixture<SilentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SilentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
