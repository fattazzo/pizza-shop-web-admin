import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from 'src/app/open-api';

@Injectable()
export class PizzasComponentService {

  private pizzaSelectedSubjet = new Subject<Item>();
  private pizzaDeletedSubject = new Subject<Item>();
  private pizzaModifiedSubject = new Subject<Item>();

  pizzaSelected = this.pizzaSelectedSubjet.asObservable();
  selectPizza(item: Item) {
    this.pizzaSelectedSubjet.next(item);
  }

  pizzaDeleted = this.pizzaDeletedSubject.asObservable();
  deletePizza(item: Item) {
    this.pizzaDeletedSubject.next(item);
  }

  pizzaModified = this.pizzaModifiedSubject.asObservable();
  modifyPizza(item: Item) {
    this.pizzaModifiedSubject.next(item);
  }
}
