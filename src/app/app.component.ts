import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppMessageService } from './services/app-message.service';
import { OrdersEventsService } from './websocket/services/orders/oders-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    translate: TranslateService,
    private ordersEventsService: OrdersEventsService,
    private appMessageService: AppMessageService) {
    translate.setDefaultLang('it');

    this.ordersEventsService.orderCreated().subscribe(order => {
      if (order != null)
        this.appMessageService.add('info', 'newOrderAlert.title', `newOrderAlert.detail`)
    })
  }
}
