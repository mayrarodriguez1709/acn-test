import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryValidationService {

  private readonly minTimeInCompany = 548; // 365 * 1.5 (year)
  private readonly minSalaryAccepted = 800000;
  private readonly approvalAmounts = {
    firstStep: {
      minSalary: 800000,
      maxSalary: 1000000,
      approvedMount: 5000000,
    },
    secondStep: {
      minSalary: 1000000,
      maxSalary: 4000000,
      approvedMount: 20000000,
    },
    thirdStep: {
      minSalary: 4000000,
      maxSalary: Infinity,
      approvedMount: 50000000,
    },
  };

  constructor() { }

  validateTime(timeInCompany: Date): boolean {
    const currentTime = new Date();

    const diffInMs = this.getDifInMsBetweenDates(currentTime, timeInCompany);
    const diffInDays = this.convertMsToDays(diffInMs);
    return diffInDays > this.minTimeInCompany;
  }

  validateSalary(salary: number) {
    return salary > this.minSalaryAccepted;
  }

  getAmountApproved(salary: number) {
    const { firstStep, secondStep, thirdStep } = this.approvalAmounts;
    let amountApproved = 0;
    switch (true) {
      case (salary < firstStep.maxSalary):
        amountApproved = firstStep.approvedMount;
        break;
      case (salary >= secondStep.minSalary && salary < secondStep.maxSalary):
        amountApproved = secondStep.approvedMount;
        break;
      case (salary >= thirdStep.minSalary):
        amountApproved = thirdStep.approvedMount;
        break;
    }
    return amountApproved;
  }

  private getDifInMsBetweenDates(date1: Date, date2: Date) {
    // @ts-ignore
    return Math.abs(new Date(date1) - new Date(date2));
  }

  private convertMsToDays(ms: number): number {
    return Math.floor(ms / (24 * 60 * 60 * 1000));
  }
}
