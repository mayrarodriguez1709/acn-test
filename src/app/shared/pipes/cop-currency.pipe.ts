import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copCurrency'
})
export class CopCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'number' && value >= 0) {
      return this.convertNumberToCop(value);
    } else {
      return value;
    }
  }

  convertNumberToCop(value: number) {
    const numFixed = value.toFixed(2);
    const cop = numFixed.replace(/\./g, ',');
    return 'COP ' + cop.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

}
