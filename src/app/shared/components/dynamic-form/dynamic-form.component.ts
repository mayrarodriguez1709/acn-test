import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicInputModel } from './dynamic-input.model';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() inputs: DynamicInputModel[];
  @Input() btnLabel: string;
  @Output() submit = new EventEmitter<any>();

  dynamicForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const group: { [key: string]: AbstractControl; } = {};
    this.inputs.forEach((i: DynamicInputModel) => {
      group[i.key] = i.required ? new FormControl(i.value || '', Validators.required) : new FormControl(i.value || '');
      this.dynamicForm = new FormGroup(group);

      if (typeof i.maxValue === 'number' && typeof i.minValue === 'number') {
        i.required ? this.dynamicForm.controls[i.key]
                .setValidators(
                    Validators.compose([
                        Validators.required,
                        Validators.max(i.maxValue),
                        Validators.min(i.minValue)])) :
            this.dynamicForm.controls[i.key]
                .setValidators(
                    Validators.compose([
                        Validators.max(i.maxValue),
                        Validators.min(i.minValue)]));
      }
    });
  }

  getFormControl = (key: string) => this.dynamicForm.controls[key];

  onSubmit() {
    this.submit.emit(this.dynamicForm.value);
  }
}
