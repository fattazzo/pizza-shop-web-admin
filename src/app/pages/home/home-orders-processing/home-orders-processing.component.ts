import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderSearchParameters, OrderSearchResult, OrdersService, OrderState, ShippingType } from 'src/app/open-api';
import { SessionService } from 'src/app/services/session.service';
import { OrdersEventsService } from 'src/app/websocket/services/orders/oders-events.service';
import { OrderProcessing } from './models/order-precessing';

@Component({
  selector: 'app-home-orders-processing',
  templateUrl: './home-orders-processing.component.html',
  styleUrls: ['./home-orders-processing.component.scss']
})
export class HomeOrdersProcessingComponent implements OnInit {

  loading = false;

  @Output() processingOrdersCounter: EventEmitter<number> = new EventEmitter()

  processingOrders: OrderProcessing[] = [];
  rowGroupMetadata: any;

  shippingTypeHome = ShippingType.DELIVERYTOHOME

  constructor(
    private ordersService: OrdersService,
    private sessionService: SessionService,
    private ordersEventsService: OrdersEventsService,
  ) { }

  ngOnInit(): void {
    this.ordersEventsService.orderUpdated().subscribe(order => {
      if (order != null)
        console.log("PROCESSING: UPDATE " + order);

      this.searchOrders()
    })

    this.sessionService.getBranch().subscribe(() => this.searchOrders())
  }

  private searchOrders() {
    const params: OrderSearchParameters = { branchId: this.sessionService.getBranchId(), states: [OrderState.PROCESSING] }

    this.loading = true;
    this.ordersService.searchOrders(params)
      .subscribe(result => {
        this.loading = false;
        this.buildProcessingOrders(result);
        this.processingOrdersCounter.emit(result.length);
      }, _error => {
        this.loading = false;
      })
  }

  private buildProcessingOrders(orders: OrderSearchResult[]) {
    const now = new Date();
    const dates = this.buildDatesRanges();

    const ordersMap: Map<Date, OrderSearchResult[]> = new Map();
    dates.forEach(date => ordersMap.set(date, []));

    // Remove all orders out of date ranges
    const ordersFiltered = orders.filter(order => {
      const test = new Date(order.dateRequestConfirmed) >= dates[0] && new Date(order.dateRequestConfirmed) <= dates[dates.length - 1]
      return test;
    })
    const ordersExcluded = orders.length - ordersFiltered.length;

    // Place order in map
    ordersFiltered.forEach(order => {
      let validDates = dates.filter(date => date <= new Date(order.dateRequestConfirmed));
      if (validDates.length > 0) {
        const validDate = validDates[validDates.length - 1];
        ordersMap.get(validDate).push(order);
      }
    })

    // remove all interval before current time except if an order is present
    ordersMap.forEach((orders, date) => {
      if (date < now && orders.length === 0) {
        ordersMap.delete(date);
      }
    })

    // remove all interval after current time +1 day except if an order is present
    const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000))
    ordersMap.forEach((orders, date) => {
      if (date > tomorrow && orders.length === 0) {
        ordersMap.delete(date);
      }
    })

    const orderArray = [];
    ordersMap.forEach((orders, date) => {
      if (orders.length > 0) {
        orders.forEach((order, idx) => orderArray.push({ timeRef: date, order: order, id: date.getTime() + idx }));
      } else {
        orderArray.push({ timeRef: date, order: null, id: date.getTime() })
      }
    })
    this.processingOrders = orderArray;
    this.updateRowGroupMetaData();
  }

  private buildDatesRanges(): Date[] {
    const minutes = this.sessionService.getSettingsValue().processingOrdersMinutesPartition;

    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const maxDate = new Date(date.getTime() + (48 * 60 * 60 * 1000))

    const result = [date];
    while (date.getTime() <= maxDate.getTime()) {
      date = new Date(date.getTime() + (minutes * 60 * 1000))
      result.push(date);
    }
    return result;
  }

  private updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.processingOrders) {
      for (let i = 0; i < this.processingOrders.length; i++) {
        let rowData = this.processingOrders[i];
        let timeRef = rowData.timeRef.getTime();
        if (i == 0) {
          this.rowGroupMetadata[timeRef] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.processingOrders[i - 1];
          let previousRowGroup = previousRowData.timeRef.getTime();
          if (timeRef === previousRowGroup)
            this.rowGroupMetadata[timeRef].size++;
          else
            this.rowGroupMetadata[timeRef] = { index: i, size: 1 };
        }
      }
    }
  }
}
