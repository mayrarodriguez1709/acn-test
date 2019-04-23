import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  convertToISO(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString(10);
    const day = (date.getDate()).toString(10);
    return `${year}-${this.addZero(month)}-${this.addZero(day)}`;
  }

  getDateFromBefore = (yearsBefore: number) => new Date(new Date().setFullYear(new Date().getFullYear() - yearsBefore));

  private addZero(value: string) {
    return value.length === 1 ? '0' + value : value;
  }
}
