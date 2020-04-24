import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeliveryAddress, ShippingMethod } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { DeliveryAdressesFormComponent } from './delivery-adresses-form/delivery-adresses-form.component';

@Component({
  selector: 'app-delivery-adresses',
  templateUrl: './delivery-adresses.component.html',
  styleUrls: ['./delivery-adresses.component.scss']
})
export class DeliveryAdressesComponent implements OnInit, OnDestroy {

  @Input() deliveryAddresses: DeliveryAddress[];
  @Input() shippingMethods: ShippingMethod[];

  @Input() editable: boolean = false;

  @Output() addressesChange = new EventEmitter<DeliveryAddress[]>();

  detailDialogRef: DynamicDialogRef;

  constructor(
    private appMessageService: AppMessageService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  openMapAddress(value: string) {
    window.open(`http://maps.google.com/?q=${value}`, "_blank");
  }

  removeAddress(addressId: number) {
    this.appMessageService.confirmDelete(() => {
      this.deliveryAddresses = this.deliveryAddresses.filter(a => a.id !== addressId);
      this.addressesChange.emit(this.deliveryAddresses);
    });
  }

  openDetailDialog(address: DeliveryAddress) {
    this.detailDialogRef = this.dialogService.open(DeliveryAdressesFormComponent, {
      data: { address: address, shippingMethods: this.shippingMethods },
      header: this.translate.instant('deliveryAddress', { count: 1 }),
      styleClass: 'p-md-6 p-col-10'
    })

    this.detailDialogRef.onClose.subscribe((address: DeliveryAddress) => {
      if (!address) { return }

      if (!address.id) {
        this.deliveryAddresses.push(address)
      } else {
        let itemIndex = this.deliveryAddresses.findIndex(item => item.id == address.id);
        this.deliveryAddresses[itemIndex] = address;
      }
      this.addressesChange.emit(this.deliveryAddresses);
    });
  }

  ngOnDestroy() {
    if (this.detailDialogRef) {
      this.detailDialogRef.close();
    }
  }
}
