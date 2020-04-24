import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ShippingMethod, ShippingmethodsService } from 'src/app/open-api';
import { ShippingMethodType } from 'src/app/open-api/model/shippingMethodType';
import { AppMessageService } from 'src/app/services/app-message.service';
import { ShippingMethodsComponentService } from '../services/shipping-methods-component.service';

@Component({
  selector: 'app-shipping-methods-form',
  templateUrl: './shipping-methods-form.component.html',
  styleUrls: ['./shipping-methods-form.component.scss']
})
export class ShippingMethodsFormComponent implements OnInit {

  shippingMethod: ShippingMethod;

  types: SelectItem[] = [];

  constructor(
    private shippingMethodsComponentService: ShippingMethodsComponentService,
    private shippingMethodService: ShippingmethodsService,
    private appMessageService: AppMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.onNew();
    this.shippingMethodsComponentService.shippingMethodSelected.subscribe(sm => {
      this.shippingMethod = sm
    });

    this.buildTypes();
    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildTypes();
    })
  }

  buildTypes() {
    this.types = Object.values(ShippingMethodType)
      .map(type => {
        let typeDesc = this.translate.instant('ShippingMethodType.' + type);
        return { label: typeDesc, value: type }
      });
  }

  onNew() {
    this.shippingMethod = { id: null, title: null, description: null, type: null, enabled: true };
  }

  onSubmit() {
    if (this.shippingMethod.id) {
      this.editShippingMethod();
    } else {
      this.createShippingMethod();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.shippingMethodService.deleteShippingMethod(this.shippingMethod.id)
        .subscribe(() => {
          this.shippingMethodsComponentService.deleteShippingMethod(this.shippingMethod)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  private createShippingMethod() {
    this.shippingMethodService.createShippingMethod(this.shippingMethod).subscribe(result => {
      this.shippingMethod = result;
      this.shippingMethodsComponentService.modifyShippingMethod(this.shippingMethod);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editShippingMethod() {
    this.shippingMethodService.updateShippingMethod(this.shippingMethod, this.shippingMethod.id).subscribe(result => {
      this.shippingMethod = result;
      this.shippingMethodsComponentService.modifyShippingMethod(this.shippingMethod);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

}
