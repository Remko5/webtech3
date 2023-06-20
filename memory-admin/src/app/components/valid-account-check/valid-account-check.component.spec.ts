import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAccountCheckComponent } from './valid-account-check.component';

describe('ValidAccountCheckComponent', () => {
  let component: ValidAccountCheckComponent;
  let fixture: ComponentFixture<ValidAccountCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidAccountCheckComponent]
    });
    fixture = TestBed.createComponent(ValidAccountCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
