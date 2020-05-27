import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateCompletedComponent } from './order-state-completed.component';

describe('OrderStateCompletedComponent', () => {
  let component: OrderStateCompletedComponent;
  let fixture: ComponentFixture<OrderStateCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
