import { Component, Input, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/open-api';

@Component({
  selector: 'app-order-details-header',
  templateUrl: './order-details-header.component.html',
  styleUrls: ['./order-details-header.component.scss']
})
export class OrderDetailsHeaderComponent implements OnInit {

  @Input() order: OrderDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
