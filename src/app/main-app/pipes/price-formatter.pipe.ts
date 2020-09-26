import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormatter'
})
export class PriceFormatterPipe implements PipeTransform {

  transform(value: string|number, ...args: unknown[]): string {
    const valueNumber = Number(value);
    return valueNumber.toFixed(2) + ' zł';
  }

}
