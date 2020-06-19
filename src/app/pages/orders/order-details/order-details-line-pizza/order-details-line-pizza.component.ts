import { Component, Input, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/open-api';

@Component({
  selector: 'app-order-details-line-pizza',
  templateUrl: './order-details-line-pizza.component.html',
  styleUrls: ['./order-details-line-pizza.component.scss']
})
export class OrderDetailsLinePizzaComponent implements OnInit {

  @Input() line: OrderLine;

  constructor() { }

  ngOnInit(): void {
  }

}
