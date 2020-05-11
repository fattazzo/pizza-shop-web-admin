import { Component, OnInit } from '@angular/core';
import { ItemPizza } from 'src/app/open-api';
import { PizzasComponentService } from './service/pizzas-component.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  providers: [PizzasComponentService]
})
export class PizzasComponent implements OnInit {

  itemPizza: ItemPizza;

  constructor(
    public pizzasComponentService: PizzasComponentService
  ) { }

  ngOnInit(): void {
  }

  onItemPizzaChange(itemPizza: ItemPizza) {
    this.itemPizza = itemPizza;
  }

}
