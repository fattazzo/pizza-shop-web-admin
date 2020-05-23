import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketResponse, SocketResponseType } from '../../models/websocket.response';
import { OrdersWebsocketService } from './orders-websocket.sevice';

export enum OrderEvent {
  CREATED = 'CREATED'
}

@Injectable({ providedIn: 'root' })
export class OrdersEventsService {

  _newOrderCreated: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(ordersWebsocketService: OrdersWebsocketService) {

    ordersWebsocketService.getObservable().subscribe({
      next: this.processMessage,
      error: err => {
        console.log(err);
      }
    });
  }

  private processMessage = (response: SocketResponse) => {
    if (response.type === SocketResponseType.SUCCESS) {

      const data = JSON.parse(response.data)

      if (data.event = OrderEvent.CREATED) {
        this._newOrderCreated.next(data.content.id)
      }
    }
  }

  orderCreated(): Observable<number> {
    return this._newOrderCreated.asObservable();
  }
}
