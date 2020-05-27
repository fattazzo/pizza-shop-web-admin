import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrderDetails, OrdersService, OrderState } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';

@Component({
  selector: 'app-order-state-processing',
  templateUrl: './order-state-processing.component.html',
  styleUrls: ['./order-state-processing.component.scss']
})
export class OrderStateProcessingComponent implements OnInit, OnChanges {

  @Input() order: OrderDetails;

  dateCreation: Date = new Date();
  dateRequest: Date = new Date();
  dateConfirmed: Date = new Date();

  @Output() orderChanged: EventEmitter<OrderDetails> = new EventEmitter(null);

  constructor(
    private ordersService: OrdersService,
    private appMessageService: AppMessageService,
    private translate: TranslateService
  ) { }

  ngOnChanges(): void {
    this.dateCreation = new Date(this.order.dateCreation);
    this.dateRequest = new Date(this.order.dateRequest);
    this.dateConfirmed = new Date(this.order.dateRequestConfirmed || this.order.dateRequest);
  }

  ngOnInit(): void {
  }

  process() {
    this.order.dateRequestConfirmed = this.dateConfirmed;
    this.order.state = OrderState.PROCESSING;
    this.ordersService.updateOrder(this.order, this.order.id).subscribe(result => {
      this.orderChanged.emit(result);
      const newStateName = this.translate.instant('OrderState.' + result.state);
      this.appMessageService.add('success', 'orderChangeStateAlert.title', 'orderChangeStateAlert.detail', null, { 'orderNumber': result.id, 'orderState': newStateName });
    })
  }

}
