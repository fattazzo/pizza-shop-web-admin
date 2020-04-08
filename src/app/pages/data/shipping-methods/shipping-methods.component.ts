import { Component, OnInit } from '@angular/core';
import { ShippingMethodsComponentService } from './services/shipping-methods-component.service';

@Component({
  selector: 'app-shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.scss'],
  providers: [ShippingMethodsComponentService]
})
export class ShippingMethodsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
