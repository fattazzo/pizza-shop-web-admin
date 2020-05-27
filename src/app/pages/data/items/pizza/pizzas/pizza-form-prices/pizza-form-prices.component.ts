import { Component, Input, OnInit } from '@angular/core';
import { ItemPizza } from 'src/app/open-api';

@Component({
  selector: 'app-pizza-form-prices',
  templateUrl: './pizza-form-prices.component.html',
  styleUrls: ['./pizza-form-prices.component.scss']
})
export class PizzaFormPricesComponent implements OnInit {

  @Input() pizza: ItemPizza;

  constructor() { }

  ngOnInit(): void { }

}
