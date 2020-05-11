import { Component, OnInit } from '@angular/core';
import { ProductVariationsComponentService } from './services/product-variations-component.service';

@Component({
  selector: 'app-product-variations',
  templateUrl: './product-variations.component.html',
  styleUrls: ['./product-variations.component.scss'],
  providers: [ProductVariationsComponentService]
})
export class ProductVariationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
