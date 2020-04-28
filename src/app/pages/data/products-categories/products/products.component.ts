import { Component, OnInit } from '@angular/core';
import { ProductDetails } from 'src/app/open-api';
import { ProductsComponentService } from './service/products-component.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsComponentService]
})
export class ProductsComponent implements OnInit {

  productDetails: ProductDetails;

  constructor(
    public productsComponentService: ProductsComponentService
  ) { }

  ngOnInit(): void {
  }

  onProductDetailsChange(productDetails: ProductDetails) {
    this.productDetails = productDetails;
  }

}
