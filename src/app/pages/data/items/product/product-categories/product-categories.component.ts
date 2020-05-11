import { Component, OnInit } from '@angular/core';
import { ProductCategoriesComponentService } from './services/product-categories-component.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
  providers: [ProductCategoriesComponentService]
})
export class ProductCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
