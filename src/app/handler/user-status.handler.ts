import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { UserStatus } from '../open-api';

export class UserStatusHandler {

  static createSelectedItems(translate: TranslateService): SelectItem[] {
    const items: SelectItem[] = [];
    for (let key in UserStatus) {
      let status = UserStatus[key];
      items.push({ label: translate.instant('UserStatus.' + status), value: status });
    }
    return items;
  }
}
