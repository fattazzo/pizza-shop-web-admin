import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { WebSocketOptions } from '../../models/websocket.options';
import { WebSocketService } from '../websocket.service';

@Injectable({ providedIn: 'root' })
export class OrdersWebsocketService extends WebSocketService {
  constructor(stompService: RxStompService) {
    super(
      stompService,
      new WebSocketOptions('/topic/orders')
    );
  }
}
