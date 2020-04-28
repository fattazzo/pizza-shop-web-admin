import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/open-api';

@Injectable()
export class ProductsComponentService {

  private productSelectedSubjet = new Subject<Product>();
  private productDeletedSubject = new Subject<Product>();
  private productModifiedSubject = new Subject<Product>();

  productSelected = this.productSelectedSubjet.asObservable();
  selectProduct(product: Product) {
    this.productSelectedSubjet.next(product);
  }

  productDeleted = this.productDeletedSubject.asObservable();
  deleteProduct(product: Product) {
    this.productDeletedSubject.next(product);
  }

  productModified = this.productModifiedSubject.asObservable();
  modifyProduct(product: Product) {
    this.productModifiedSubject.next(product);
  }
}
