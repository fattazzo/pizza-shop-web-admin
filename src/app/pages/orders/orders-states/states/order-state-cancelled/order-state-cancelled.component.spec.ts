import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateCancelledComponent } from './order-state-cancelled.component';

describe('OrderStateCancelledComponent', () => {
  let component: OrderStateCancelledComponent;
  let fixture: ComponentFixture<OrderStateCancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateCancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
