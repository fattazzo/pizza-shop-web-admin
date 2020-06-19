import { Component, Input, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/open-api';

@Component({
  selector: 'app-order-details-line-product',
  templateUrl: './order-details-line-product.component.html',
  styleUrls: ['./order-details-line-product.component.scss']
})
export class OrderDetailsLineProductComponent implements OnInit {

  @Input() line: OrderLine;

  constructor() { }

  ngOnInit(): void {
  }

}
