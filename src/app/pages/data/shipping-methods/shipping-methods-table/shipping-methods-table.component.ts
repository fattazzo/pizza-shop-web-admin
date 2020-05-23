import { Component, OnInit } from '@angular/core';
import { ShippingMethod, ShippingmethodsService } from 'src/app/open-api';
import { ShippingMethodsComponentService } from '../services/shipping-methods-component.service';

@Component({
  selector: 'app-shipping-methods-table',
  templateUrl: './shipping-methods-table.component.html',
  styleUrls: ['./shipping-methods-table.component.scss']
})
export class ShippingMethodsTableComponent implements OnInit {

  shippingMethods: ShippingMethod[] = [];
  shippingMethodSelected: ShippingMethod;

  loading = false;

  constructor(
    private shippingMethodsService: ShippingmethodsService,
    private shippingMethodsComponentService: ShippingMethodsComponentService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.shippingMethodsService.getShippingMethods(true)
      .subscribe(result => {
        this.loading = false;
        this.shippingMethods = result;
      }, _error => {
        this.loading = false;
      })

    this.shippingMethodsComponentService.shippingMethodDeleted.subscribe(shippingMethod => this.removeShippingMethod(shippingMethod));
    this.shippingMethodsComponentService.shippingMethodModified.subscribe(shippingMethod => this.addShippingMethod(shippingMethod));
  }

  onRowSelect(event) {
    this.shippingMethodSelected = event.data;
    this.shippingMethodsComponentService.selectShippingMethod(Object.assign({}, event.data))
  }

  private removeShippingMethod(shippingMethod: ShippingMethod) {
    this.shippingMethods = this.shippingMethods.filter(obj => obj.id !== shippingMethod.id)
  }

  private addShippingMethod(shippingMethod: ShippingMethod) {
    const shippingMethodFound = this.shippingMethods.find(obj => obj.id === shippingMethod.id);
    if (shippingMethodFound !== undefined) {
      const index = this.shippingMethods.indexOf(shippingMethodFound);
      if (index !== -1) {
        this.shippingMethods[index] = shippingMethod;
      }
    } else {
      this.shippingMethods.push(shippingMethod);
    }
  }
}
