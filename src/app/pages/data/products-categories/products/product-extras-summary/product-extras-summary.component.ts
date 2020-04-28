import { Component, Input, OnInit } from '@angular/core';
import { ProductDetails } from 'src/app/open-api';
import { ProductsComponentService } from '../service/products-component.service';

@Component({
  selector: 'app-product-extras-summary',
  templateUrl: './product-extras-summary.component.html',
  styleUrls: ['./product-extras-summary.component.scss']
})
export class ProductExtrasSummaryComponent implements OnInit {

  @Input() product: ProductDetails;

  rowGroupMetadata: any;

  constructor(
    private productsComponentService: ProductsComponentService
  ) { }

  ngOnInit(): void {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.product && this.product.toppingExtras) {
      for (let i = 0; i < this.product.toppingExtras.length; i++) {
        let rowData = this.product.toppingExtras[i];
        let toppingId = rowData.topping.id;
        if (i == 0) {
          this.rowGroupMetadata[toppingId] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.product.toppingExtras[i - 1];
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
