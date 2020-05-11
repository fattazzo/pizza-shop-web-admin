import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ErrorData, ErrorResponse } from '../open-api';

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

  confirmDelete(onAccept: () => void) {
    this.confirm('confirmDeleteTitle', 'confirmDeleteResource', onAccept);
  }

  addSuccessfullInsert(titleKey: string = 'message.insert.title', detailKey: string = 'message.insert.detail') {
    this.add('success', titleKey, detailKey)
  }

  addSuccessfullUpdate(titleKey: string = 'message.update.title', detailKey: string = 'message.update.detail') {
    this.add('success', titleKey, detailKey)
  }

  addSuccessfullDelete(titleKey: string = 'message.delete.title', detailKey: string = 'message.delete.detail') {
    this.add('success', titleKey, detailKey)
  }

  add(severity: string, titleKey: string, detailKey: string) {
    const message = {
      severity: severity,
      summary: this.translate.instant(titleKey),
      detail: this.translate.instant(detailKey)
    };

    this.messageService.add(message)
  }

  addRequestErrorMessage(request: HttpRequest<any>, err: HttpErrorResponse) {
    var message: Message = {
      severity: 'error',
      summary: this.translate.instant('message.error.title'),
      detail: err.error.error
    };

    if (err.error) {
      try {
        const respError: ErrorResponse = err;
        if (respError.error.userTitle) {
          message = this.convertToMessage(respError.error);
        }
      } catch (e) {
        // Error, use standard message
      }
    }

    if (err.error.error) {
      try {
        const respError: ErrorResponse = err.error;
        if (respError.error.userTitle) {
          message = this.convertToMessage(respError.error);
        }
      } catch (e) {
        // Error, use standard message
      }
    }
    this.messageService.add(message)
  }

  private convertToMessage(error: ErrorData): Message {

    var details = '';
    if (error.constraintErrors) {
      error.constraintErrors.forEach(ce => {
        details += `<br/><b>${this.translate.instant(`field.${ce.fieldName}`)}</b><br/>`;

        ce.constraintsNotRespected?.forEach(c => {
          details += `- ${c}<br/>`
        });
      })
    }

    return {
      key: 'html',
      severity: 'error',
      summary: `<b>${error.userTitle}</b><br/>${error.userMessage}`,
      detail: details
    }
  }
}
