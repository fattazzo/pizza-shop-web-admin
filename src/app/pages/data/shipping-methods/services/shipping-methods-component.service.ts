import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShippingMethod } from 'src/app/open-api';

@Injectable()
export class ShippingMethodsComponentService {

  private shippingMethodSelectedSubjet = new Subject<ShippingMethod>();
  private shippingMethodDeletedSubject = new Subject<ShippingMethod>();
  private shippingMethodModifiedSubject = new Subject<ShippingMethod>();

  shippingMethodSelected = this.shippingMethodSelectedSubjet.asObservable();
  selectShippingMethod(shippingMethod: ShippingMethod) {
    this.shippingMethodSelectedSubjet.next(shippingMethod);
  }

  shippingMethodDeleted = this.shippingMethodDeletedSubject.asObservable();
  deleteShippingMethod(shippingMethod: ShippingMethod) {
    this.shippingMethodDeletedSubject.next(shippingMethod);
  }

  shippingMethodModified = this.shippingMethodModifiedSubject.asObservable();
  modifyShippingMethod(shippingMethod: ShippingMethod) {
    this.shippingMethodModifiedSubject.next(shippingMethod);
  }
}
