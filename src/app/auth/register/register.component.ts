import { Component, OnInit } from '@angular/core';
import { DynamicInputModel } from '../../shared/components/dynamic-form/dynamic-input.model';
import { UserModel } from '../../core/models/user.model';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { HelperService } from '../../core/services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerInputs: DynamicInputModel[];
  maxAge = 118;
  minAge = 18;

  constructor(
      private router: Router,
      private notificationsService: NotificationsService,
      private authService: AuthService,
      private helperService: HelperService
  ) {
  }

  ngOnInit(): void {
    const minDate = this.helperService.convertToISO(this.getMinDate());
    const maxDate = this.helperService.convertToISO(this.getMaxDate());

    this.registerInputs = [
      {
        name: 'identification',
        key: 'identification',
        required: true,
        type: 'text',
        controlType: 'textbox',
        label: 'Identificación'
      },
      {
        name: 'firstname',
        key: 'firstname',
        required: true,
        type: 'text',
        controlType: 'textbox',
        label: 'Nombre'
      },
      {
        name: 'lastname',
        key: 'lastname',
        required: true,
        type: 'text',
        controlType: 'textbox',
        label: 'Apellido'
      },
      {
        name: 'birthdate',
        key: 'birthdate',
        required: true,
        controlType: 'datepicker',
        label: 'Fecha de Nacimiento',
        minDate: minDate,
        maxDate: maxDate
      },
    ];
  }

  onSubmit(newUser: UserModel): void {
    this.authService.register(newUser)
        .subscribe(
            (res) => this.successRegister(),
            (err) => err.exists ? this.notificationsService.showToast('El usuario ya existe') :
                this.notificationsService.showToast('Ha ocurrido un error'));
  }

  successRegister() {
    this.notificationsService.showToast('Usuario registrado exitosamente, Bienvenido!', 2000)
        .then(() => this.router.navigate(['home']));
  }

  private getMinDate = () => this.helperService.getDateFromBefore(this.maxAge);

  private getMaxDate = () => this.helperService.getDateFromBefore(this.minAge);
}
