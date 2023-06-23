import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateTableComponent } from './aggregate-table.component';

describe('AggregateTableComponent', () => {
  let component: AggregateTableComponent;
  let fixture: ComponentFixture<AggregateTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggregateTableComponent]
    });
    fixture = TestBed.createComponent(AggregateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
