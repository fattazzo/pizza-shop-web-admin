import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeliveryAddress, ShippingMethod } from 'src/app/open-api';

@Component({
  selector: 'app-delivery-adresses-form',
  templateUrl: './delivery-adresses-form.component.html',
  styleUrls: ['./delivery-adresses-form.component.scss']
})
export class DeliveryAdressesFormComponent implements OnInit {

  address: DeliveryAddress;

  shippingMethods: SelectItem[];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.address = this.config.data.address;
    if (!this.address) {
      this.address = {
        id: null,
        address: { streetAddress: null, place: null },
        shippingMethod: null
      };
    }

    this.shippingMethods = [];
    if (this.config.data.shippingMethods) {
      this.shippingMethods = (this.config.data.shippingMethods as ShippingMethod[])
        .map(sm => { return { label: sm.title, value: sm } })
    }
    this.shippingMethods.unshift({ label: '', value: null });
  }

  onSubmit() {
    if (this.ref) {
      this.ref.close(this.address);
    }
  }

}
