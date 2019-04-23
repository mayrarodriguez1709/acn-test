import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { CopCurrencyPipe } from './pipes/cop-currency.pipe';

@NgModule({
    declarations: [
      DynamicFormComponent,
      CopCurrencyPipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [
      DynamicFormComponent,
      CopCurrencyPipe
    ],
    providers: [
        CopCurrencyPipe
    ]
})
export class SharedModule { }
