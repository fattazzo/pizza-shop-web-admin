import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppMessageService {

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) { }

  confirm(headerKey: string, messageKey: string, onAccept: () => void) {
    this.confirmationService.confirm({
      header: this.translate.instant(headerKey),
      message: this.translate.instant(messageKey),
      icon: 'pi pi-info-circle',
      acceptLabel: this.translate.instant('yes'),
      rejectLabel: this.translate.instant('no'),
      accept: () => { onAccept() }
    });
  }

}
