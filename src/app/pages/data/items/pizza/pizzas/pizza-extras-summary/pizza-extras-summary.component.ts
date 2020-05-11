import { Component, Input, OnInit } from '@angular/core';
import { ItemPizza } from 'src/app/open-api';
import { PizzasComponentService } from '../service/pizzas-component.service';

@Component({
  selector: 'app-pizza-extras-summary',
  templateUrl: './pizza-extras-summary.component.html',
  styleUrls: ['./pizza-extras-summary.component.scss']
})
export class PizzaExtrasSummaryComponent implements OnInit {

  @Input() pizza: ItemPizza;

  rowGroupMetadata: any;

  constructor(
    private pizzasComponentService: PizzasComponentService
  ) { }

  ngOnInit(): void {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.pizza && this.pizza.toppingExtras) {
      for (let i = 0; i < this.pizza.toppingExtras.length; i++) {
        let rowData = this.pizza.toppingExtras[i];
        let toppingId = rowData.topping.id;
        if (i == 0) {
          this.rowGroupMetadata[toppingId] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.pizza.toppingExtras[i - 1];
          let previousRowGroup = previousRowData.topping.id;
          if (toppingId === previousRowGroup)
            this.rowGroupMetadata[toppingId].size++;
          else
            this.rowGroupMetadata[toppingId] = { index: i, size: 1 };
        }
      }
    }
  }

}
