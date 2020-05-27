import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderDetails, OrderState } from 'src/app/open-api';

@Component({
  selector: 'app-orders-states',
  templateUrl: './orders-states.component.html',
  styleUrls: ['./orders-states.component.scss']
})
export class OrdersStatesComponent implements OnInit {

  order: OrderDetails;

  states: OrderState[] = [OrderState.PENDING, OrderState.PROCESSING, OrderState.COMPLETED, OrderState.CANCELLED, OrderState.REFUNDED];
  selectedState?: OrderState = null

  stateEnum: typeof OrderState = OrderState;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.order = this.config.data.order;
  }

  getOrderStatusClass(state: OrderState): string {
    return !this.selectedState || this.selectedState !== state ? "order-state-badge status-DISABLED" : `order-state-badge status-${state}`;
  }

  onStateSelected(state: OrderState) {
    this.selectedState = state;
  }

  onOrderChanged(order: OrderDetails) {
    if (this.ref) {
      this.ref.close(order);
    }
  }
}
