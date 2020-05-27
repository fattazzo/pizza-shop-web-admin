import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateFailedComponent } from './order-state-failed.component';

describe('OrderStateFailedComponent', () => {
  let component: OrderStateFailedComponent;
  let fixture: ComponentFixture<OrderStateFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
