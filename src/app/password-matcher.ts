import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordMatcher {
  static match: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');
    // Validators.required error
    if (!confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ required: true });
      return { required: true };
    }
    // validators: PasswordMatcher.match  error
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