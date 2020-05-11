import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { Category, Item, PizzacategoriesService, PizzasService } from 'src/app/open-api';
import { MyCurrencyPipe } from 'src/app/pipes/my-currency.pipe';
import { SessionService } from 'src/app/services/session.service';
import { PizzasComponentService } from '../service/pizzas-component.service';

@Component({
  selector: 'app-pizzas-table',
  templateUrl: './pizzas-table.component.html',
  styleUrls: ['./pizzas-table.component.scss']
})
export class PizzasTableComponent implements OnInit {

  pizzas: Item[] = [];
  pizzaSelected: Item;

  categoriesItems: SelectItem[] = [];

  loading = false;

  constructor(
    private pizzacategoriesService: PizzacategoriesService,
    private pizzasService: PizzasService,
    private pizzasComponentService: PizzasComponentService,
    private session: SessionService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.pizzacategoriesService.getPizzaCategories(true)
      .pipe(map(cs => cs.map(c => { return { label: c.name, value: c } })))
      .subscribe(items => {
        this.categoriesItems = [{ label: this.translate.instant('all', { gender: 'female' }), value: null }, ...items]
        this.onCategoryChange(null)
      })

    this.pizzasComponentService.pizzaDeleted.subscribe(pizza => this.removePizza(pizza));
    this.pizzasComponentService.pizzaModified.subscribe(pizza => this.addPizza(pizza));
  }

  onRowSelect(event) {
    this.pizzaSelected = event.data;
    this.pizzasComponentService.selectPizza(Object.assign({}, event.data))
  }

  private removePizza(pizza: Item) {
    this.pizzas = this.pizzas.filter(obj => obj.id !== pizza.id)
  }

  private addPizza(pizza: Item) {
    const pizzaFound = this.pizzas.find(obj => obj.id === pizza.id);
    if (pizzaFound !== undefined) {
      const index = this.pizzas.indexOf(pizzaFound);
      if (index !== -1) {
        this.pizzas[index] = pizza;
      }
    } else {
      this.pizzas.push(pizza);
    }
  }

  onCategoryChange(category: Category) {
    this.loading = true;
    this.pizzasService.getItemPizzas(true, category?.id)
      .subscribe(result => {
        this.loading = false;
        this.pizzas = result;
      }, _error => {
        this.loading = false;
      })
  }

  formatPrices(items: Item): string {
    let pricesString = '';
    let separator = '';

    const currencyPipe = new MyCurrencyPipe(this.session);
    items.availablePrices?.map(price => currencyPipe.transform(price))
      .forEach(price => {
        pricesString += `${separator}${price}`;
        separator = ' - ';
      })
    return pricesString
  }
}
