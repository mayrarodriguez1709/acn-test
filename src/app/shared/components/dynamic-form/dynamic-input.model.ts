export interface DynamicInputModel {
    key: string;
    name: string;
    controlType: 'textbox' | 'datepicker';
    label: string;
    type?: 'text' | 'number' | 'password';
    placeholder?: string;
    value?: string | number;
    cssClass?: string;
    required?: boolean;
    minDate?: string; // format YYYY-M-DD
    maxDate?: string; // format YYYY-M-DD
    minValue?: number;
    maxValue?: number;
    isCurrency?: boolean;
}
