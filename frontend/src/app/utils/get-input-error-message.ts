import { FormGroup } from '@angular/forms';

export function getInputErrorMessage(
  form: FormGroup,
  controlName: string
): string {
  const control = form.get(controlName);

  if (!control || !control.errors || !control.touched) return '';

  if (control.errors['required']) return 'Campo obrigatório';

  if (control.errors['email']) return 'Email inválido';

  if (control.errors['minlength'])
    return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;

  if (control.errors['maxlength'])
    return `Máximo de ${control.errors['maxlength'].requiredLength} caracteres`;

  return 'Campo inválido';
}
