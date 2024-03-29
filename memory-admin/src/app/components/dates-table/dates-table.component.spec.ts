import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesTableComponent } from './dates-table.component';

describe('DatesTableComponent', () => {
  let component: DatesTableComponent;
  let fixture: ComponentFixture<DatesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatesTableComponent]
    });
    fixture = TestBed.createComponent(DatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
