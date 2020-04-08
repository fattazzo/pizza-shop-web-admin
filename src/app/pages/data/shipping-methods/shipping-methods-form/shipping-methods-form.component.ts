import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Role, ShippingMethod, ShippingmethodsService } from 'src/app/open-api';
import { ShippingMethodType } from 'src/app/open-api/model/shippingMethodType';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthUtils } from 'src/app/utils/auth-utils';
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
    private authUtils: AuthUtils,
    private session: SessionService,
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
    this.shippingMethod = { id: null, title: null, description: null, type: null, enabled: false };
  }

  onSubmit() {
    if (this.shippingMethod.id) {
      this.editShippingMethod();
    } else {
      this.createShippingMethod();
    }
  }

  onDelete() {
    var deleteFunc = function () {
      this.shippingMethodService.deleteShippingMethod(this.session.getCompanyId(), this.shippingMethod.id)
        .subscribe(() => {
          this.shippingMethodsComponentService.deleteShippingMethod(this.shippingMethod)
          this.onNew();
        });
    }

    this.appMessageService.confirm('confirmDeleteTitle', 'confirmDeleteResource', deleteFunc);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.SHIPPINGMETHODSEDIT]);
  }

  private createShippingMethod() {
    this.shippingMethodService.createShippingMethod(this.shippingMethod, this.session.getCompanyId()).subscribe(result => {
      this.shippingMethod = result;
      this.shippingMethodsComponentService.modifyShippingMethod(this.shippingMethod);
    })
  }

  private editShippingMethod() {
    this.shippingMethodService.updateShippingMethod(this.shippingMethod, this.session.getCompanyId(), this.shippingMethod.id).subscribe(result => {
      this.shippingMethod = result;
      this.shippingMethodsComponentService.modifyShippingMethod(this.shippingMethod);
    })
  }

}
