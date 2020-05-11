import { Component, OnInit } from '@angular/core';
import { ProductvariationsService, VariationProduct } from 'src/app/open-api';
import { ProductVariationsComponentService } from '../services/product-variations-component.service';

@Component({
  selector: 'app-product-variations-table',
  templateUrl: './product-variations-table.component.html',
  styleUrls: ['./product-variations-table.component.scss']
})
export class ProductVariationsTableComponent implements OnInit {

  variations: VariationProduct[] = [];
  variationSelected: VariationProduct;

  loading = false;

  constructor(
    private variationService: ProductvariationsService,
    private productVariationsComponentService: ProductVariationsComponentService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.variationService.getVariationProducts(true)
      .subscribe(result => {
        this.loading = false;
        this.variations = result;
      }, _error => {
        this.loading = false;
      })

    this.productVariationsComponentService.variationDeleted.subscribe(variation => this.removeVariationProduct(variation));
    this.productVariationsComponentService.variationModified.subscribe(variation => this.addVariationProduct(variation));
  }

  onRowSelect(event) {
    this.variationSelected = event.data;
    this.productVariationsComponentService.selectVariationProduct(Object.assign({}, event.data))
  }

  private removeVariationProduct(variation: VariationProduct) {
    this.variations = this.variations.filter(obj => obj.id !== variation.id)
  }

  private addVariationProduct(variation: VariationProduct) {
    const variationFound = this.variations.find(obj => obj.id === variation.id);
    if (variationFound !== undefined) {
      const index = this.variations.indexOf(variationFound);
      if (index !== -1) {
        this.variations[index] = variation;
      }
    } else {
      this.variations.push(variation);
    }
  }

}
