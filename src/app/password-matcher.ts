import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordMatcher {
  static match: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordsNotMatch: true });
      return { passwordsNotMatch: true };
    } else {
      if (confirmPasswordControl) {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    }
  }
}