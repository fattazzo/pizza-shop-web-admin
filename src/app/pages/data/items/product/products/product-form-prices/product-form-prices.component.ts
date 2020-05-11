import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { ItemProduct, ItemProductPrice, ProductvariationsService, VariationProduct } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';

@Component({
  selector: 'app-product-form-prices',
  templateUrl: './product-form-prices.component.html',
  styleUrls: ['./product-form-prices.component.scss']
})
export class ProductFormPricesComponent implements OnInit {

  @Input() product: ItemProduct;

  variations: SelectItem[] = [];
  variationSelected: VariationProduct = null;

  constructor(
    private productvariationsService: ProductvariationsService,
    private appMessageService: AppMessageService
  ) { }

  ngOnInit(): void {
    this.productvariationsService.getVariationProducts(true)
      .pipe(map(vs => vs.map(v => { return { label: v.name, value: v } })))
      .subscribe(v => this.variations = [{ label: '', value: null }, ...v]);
  }

  addVariationPrice() {
    if (!this.variationSelected) { return }

    let find = this.product?.prices?.find(p => p.variation.id === this.variationSelected.id);

    if (!find) {
      if (!this.product.prices) {
        this.product.prices = [];
      }
      this.product.prices.push({ id: null, variation: { id: this.variationSelected.id, name: this.variationSelected.name, enabled: this.variationSelected.enabled }, price: 0 })
    } else {
      this.appMessageService.add('warn', 'warning', 'variationAlreadyAdded');
    }
  }

  removeVariationPrice(itemProductPrice: ItemProductPrice) {

    let index = this.product?.prices?.findIndex(p => p.variation.id === itemProductPrice.variation.id);

    if (!index && index !== -1) {
      this.product.prices.splice(index, 1);
    }
  }

}
