import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from 'src/app/open-api';

@Injectable()
export class ProductsComponentService {

  private productSelectedSubjet = new Subject<Item>();
  private productDeletedSubject = new Subject<Item>();
  private productModifiedSubject = new Subject<Item>();

  productSelected = this.productSelectedSubjet.asObservable();
  selectProduct(item: Item) {
    this.productSelectedSubjet.next(item);
  }

  productDeleted = this.productDeletedSubject.asObservable();
  deleteProduct(item: Item) {
    this.productDeletedSubject.next(item);
  }

  productModified = this.productModifiedSubject.asObservable();
  modifyProduct(item: Item) {
    this.productModifiedSubject.next(item);
  }
}
