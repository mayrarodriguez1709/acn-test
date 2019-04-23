import { Component, OnInit } from '@angular/core';
import { DynamicInputModel } from '../shared/components/dynamic-form/dynamic-input.model';
import { CreditApplicationModel } from '../core/models/credit-application.model';
import { HelperService } from '../core/services/helper/helper.service';
import { SalaryValidationService } from '../shared/services/salary-validation/salary-validation.service';
import { NotificationsService } from '../shared/services/notifications/notifications.service';
import { CopCurrencyPipe } from '../shared/pipes/cop-currency.pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  creditApplicationInputs: DynamicInputModel[];
  private readonly maxTimeInCompany = 100;
  private readonly minSalary = 0;
  private readonly maxSalary = 100000000;

  constructor(
      private helperService: HelperService,
      private salaryValidationService: SalaryValidationService,
      private notificationsService: NotificationsService,
      private copCurrencyPipe: CopCurrencyPipe,
  ) {

  }

  ngOnInit(): void {
    const minDate = this.helperService.convertToISO(this.getMinDate());
    const maxDate = this.helperService.convertToISO(this.getMaxDate());

    this.creditApplicationInputs = [
      {
        name: 'companyName',
        key: 'companyName',
        required: true,
        type: 'text',
        controlType: 'textbox',
        label: 'Nombre de la Empresa'
      },
      {
        name: 'companyId',
        key: 'companyId',
        required: true,
        type: 'number',
        controlType: 'textbox',
        label: 'Nit de la Empresa'
      },
      {
        name: 'salary',
        key: 'salary',
        required: true,
        type: 'number',
        controlType: 'textbox',
        label: 'Salario',
        minValue: this.minSalary,
        maxValue: this.maxSalary,
        isCurrency: true,
      },
      {
        name: 'admissionDate',
        key: 'admissionDate',
        required: true,
        controlType: 'datepicker',
        label: 'Fecha de Ingreso en la empresa',
        maxDate: maxDate,
        minDate: minDate,
      },
    ];
  }

  onSubmit(creditApplication: CreditApplicationModel): void {
    const isValidTime = this.salaryValidationService.validateTime(creditApplication.admissionDate);
    const isValidSalary = this.salaryValidationService.validateSalary(creditApplication.salary);
    if (!isValidTime || !isValidSalary) {
        this.notificationsService
            .showConfirmAlert(
                'Lo lamentamos',
                '',
                'Desafortunadamente no cumple con el perfil para la aprobación del crédito, ' +
                'lo invitamos a seguir intentandolo en otro momento',
                'Aceptar');
    } else {
       const amountApproved = this.salaryValidationService.getAmountApproved(creditApplication.salary);
        this.notificationsService
            .showConfirmAlert(
                '¡FELICIDADES!',
                '',
        `Su crédito ha sido aprobado por el valor de ${this.copCurrencyPipe.convertNumberToCop(amountApproved)}`,
                'Aceptar');
    }
  }

  private getMinDate = () => this.helperService.getDateFromBefore(this.maxTimeInCompany);

  private getMaxDate = () => this.helperService.getDateFromBefore(0);

}
