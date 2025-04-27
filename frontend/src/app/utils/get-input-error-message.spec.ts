import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getInputErrorMessage } from './get-input-error-message';

describe('getInputErrorMessage', () => {
  let form: FormGroup;

  beforeEach(() => {
    form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [Validators.maxLength(100)]),
      custom: new FormControl('', [() => ({ customError: true })]),
    });
  });

  it('should return empty string when control is not found', () => {
    expect(getInputErrorMessage(form, 'nonExistentControl')).toBe('');
  });

  it('should return empty string when control has no errors', () => {
    form.get('name')?.setValue('John');
    expect(getInputErrorMessage(form, 'name')).toBe('');
  });

  it('should return empty string when control is not touched', () => {
    expect(getInputErrorMessage(form, 'name')).toBe('');
  });

  it('should return required error message', () => {
    form.get('name')?.markAsTouched();
    form.get('name')?.updateValueAndValidity();
    expect(getInputErrorMessage(form, 'name')).toBe('Campo obrigatório');
  });

  it('should return email error message', () => {
    form.get('email')?.setValue('invalid-email');
    form.get('email')?.markAsTouched();
    form.get('email')?.updateValueAndValidity();
    expect(getInputErrorMessage(form, 'email')).toBe('Email inválido');
  });

  it('should return minlength error message', () => {
    form.get('password')?.setValue('123');
    form.get('password')?.markAsTouched();
    form.get('password')?.updateValueAndValidity();
    expect(getInputErrorMessage(form, 'password')).toBe(
      'Mínimo de 6 caracteres'
    );
  });

  it('should return maxlength error message', () => {
    const longText = 'a'.repeat(101);
    form.get('description')?.setValue(longText);
    form.get('description')?.markAsTouched();
    form.get('description')?.updateValueAndValidity();
    expect(getInputErrorMessage(form, 'description')).toBe(
      'Máximo de 100 caracteres'
    );
  });

  it('should return default error message for unknown errors', () => {
    form.get('custom')?.markAsTouched();
    form.get('custom')?.updateValueAndValidity();
    expect(getInputErrorMessage(form, 'custom')).toBe('Campo inválido');
  });
});
