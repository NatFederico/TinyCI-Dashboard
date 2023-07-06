import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPage1PageComponent } from './user-page1-page.component';

describe('UserPage1PageComponent', () => {
  let component: UserPage1PageComponent;
  let fixture: ComponentFixture<UserPage1PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPage1PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPage1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
