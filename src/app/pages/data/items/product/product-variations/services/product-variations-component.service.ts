import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VariationProduct } from 'src/app/open-api';

@Injectable()
export class ProductVariationsComponentService {

  private variationSelectedSubjet = new Subject<VariationProduct>();
  private variationDeletedSubject = new Subject<VariationProduct>();
  private variationModifiedSubject = new Subject<VariationProduct>();

  variationSelected = this.variationSelectedSubjet.asObservable();
  selectVariationProduct(variation: VariationProduct) {
    this.variationSelectedSubjet.next(variation);
  }

  variationDeleted = this.variationDeletedSubject.asObservable();
  deleteVariationProduct(variation: VariationProduct) {
    this.variationDeletedSubject.next(variation);
  }

  variationModified = this.variationModifiedSubject.asObservable();
  modifyVariationProduct(variation: VariationProduct) {
    this.variationModifiedSubject.next(variation);
  }
}
