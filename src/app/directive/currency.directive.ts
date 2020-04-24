import { Directive, ElementRef } from '@angular/core';
import { SessionService } from '../services/session.service';
import { NumericDirective } from './numeric.directive';

@Directive({ selector: '[currency]' })
export class CurrencyDirective extends NumericDirective {

  constructor(el: ElementRef, private session: SessionService) {
    super(el);
  }

  protected getDecimals(): number {
    return this.session.getSettingsValue().currencyDecimals;
  }
}
