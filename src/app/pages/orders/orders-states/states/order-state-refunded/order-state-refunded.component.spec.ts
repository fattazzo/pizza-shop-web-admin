import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateRefundedComponent } from './order-state-refunded.component';

describe('OrderStateRefundedComponent', () => {
  let component: OrderStateRefundedComponent;
  let fixture: ComponentFixture<OrderStateRefundedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateRefundedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateRefundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
