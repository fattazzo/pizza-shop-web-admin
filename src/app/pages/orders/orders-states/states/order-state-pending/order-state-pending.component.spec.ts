import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatePendingComponent } from './order-state-pending.component';

describe('OrderStatePendingComponent', () => {
  let component: OrderStatePendingComponent;
  let fixture: ComponentFixture<OrderStatePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
