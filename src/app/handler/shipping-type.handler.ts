import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ShippingType } from '../open-api';

export class ShippingTypeHandler {

  static createSelectedItems(translate: TranslateService): SelectItem[] {
    const items: SelectItem[] = [];
    for (let key in ShippingType) {
      let type = ShippingType[key];
      items.push({ label: translate.instant('ShippingType.' + type), value: type });
    }
    return items;
  }
}
