
import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from '../services/session.service';

@Pipe({ name: 'mycurrency' })
export class MyCurrencyPipe implements PipeTransform {

  constructor(private session: SessionService) { }

  transform(value: number): string {
    if (value === null || value === undefined) {
      return ''
    }

    const numDec = this.session.getSettingsValue()?.currencyDecimals || 2;
    const symbol = this.session.getSettingsValue()?.currencySymbol || '€';

    return `${value.toFixed(numDec)} ${symbol}`;
  }
}
