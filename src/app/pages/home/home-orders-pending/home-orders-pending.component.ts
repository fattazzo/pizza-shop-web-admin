import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { OrderSearchParameters, OrderSearchResult, OrdersService, OrderState, ShippingType } from 'src/app/open-api';
import { SessionService } from 'src/app/services/session.service';
import { OrdersEventsService } from 'src/app/websocket/services/orders/oders-events.service';
import { OrderDetailsComponent } from '../../orders/order-details/order-details.component';
import { OrdersStatesComponent } from '../../orders/orders-states/orders-states.component';

@Component({
  selector: 'app-home-orders-list',
  templateUrl: './home-orders-pending.component.html',
  styleUrls: ['./home-orders-pending.component.scss']
})
export class HomeOrdersPendingComponent implements OnInit {

  orders: OrderSearchResult[] = []

  loading = false

  shippingTypeHome = ShippingType.DELIVERYTOHOME

  @Output() pendingOrdersCounter: EventEmitter<number> = new EventEmitter()

  constructor(
    private ordersEventsService: OrdersEventsService,
    private dialogService: DialogService,
    private ordersService: OrdersService,
    private sessionService: SessionService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.ordersEventsService.orderCreated().subscribe(order => {
      if (order != null)
        console.log("PENDING: CREATE " + order);
      this.searchOrders()
    })
    this.ordersEventsService.orderUpdated().subscribe(order => {
      if (order != null)
        console.log("PENDING: UPDATE " + order);
      this.searchOrders()
    })

    this.sessionService.getBranch().subscribe(() => this.searchOrders())
  }

  private searchOrders() {
    const params: OrderSearchParameters = { branchId: this.sessionService.getBranchId(), states: [OrderState.PENDING] }

    this.loading = true;
    this.ordersService.searchOrders(params)
      .subscribe(result => {
        this.loading = false;
        this.orders = result;
        this.pendingOrdersCounter.emit(result.length)
      }, _error => {
        this.loading = false;
      })
  }

  onOrderSelect(order: OrderSearchResult) {
    this.ordersService.getOrder(order.id).subscribe(orderDetails => {
      const ref = this.dialogService.open(OrdersStatesComponent, {
        data: { order: orderDetails },
        header: this.translate.instant('chooseNewOrderState'),
        styleClass: 'p-col-11 p-md-8 p-lg-6'
      });
    })
  }

  openOrderDetails(order: OrderSearchResult) {
    this.ordersService.getOrder(order.id).subscribe(orderDetails => {
      const ref = this.dialogService.open(OrderDetailsComponent, {
        data: { order: orderDetails },
        header: this.translate.instant('orderDetails', { number: orderDetails.id }),
        styleClass: 'p-col-11 p-md-9 p-lg-6'
      });
    })
  }
}
