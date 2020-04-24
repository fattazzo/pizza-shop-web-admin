import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { UserType } from '../open-api';

export class UserTypeHandler {

  static createSelectedItems(translate: TranslateService): SelectItem[] {
    const items: SelectItem[] = [];
    for (let key in UserType) {
      let type = UserType[key];
      items.push({ label: translate.instant('UserType.' + type), value: type });
    }
    return items;
  }
}
