import { Component, OnInit } from '@angular/core';
import { ProductsComponentService } from './services/products-component.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsComponentService]
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
