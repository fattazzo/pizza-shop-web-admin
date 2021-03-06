import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrderDetails, OrdersService, OrderState } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';

@Component({
  selector: 'app-order-state-completed',
  templateUrl: './order-state-completed.component.html',
  styleUrls: ['./order-state-completed.component.scss']
})
export class OrderStateCompletedComponent implements OnInit {

  @Input() order: OrderDetails;

  @Output() orderChanged: EventEmitter<OrderDetails> = new EventEmitter(null);

  constructor(
    private ordersService: OrdersService,
    private appMessageService: AppMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  process() {
    this.order.state = OrderState.COMPLETED;
    this.ordersService.updateOrder(this.order, this.order.id).subscribe(result => {
      this.orderChanged.emit(result);
      const newStateName = this.translate.instant('OrderState.' + result.state);
      this.appMessageService.add('success', 'orderChangeStateAlert.title', 'orderChangeStateAlert.detail', null, { 'orderNumber': result.id, 'orderState': newStateName });
    })
  }
}
