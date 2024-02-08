import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;

    // Check if the password contains at least one uppercase, one lowercase, and one special character
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const specialCharacterPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const hasUpperCase = upperCasePattern.test(password);
    const hasLowerCase = lowerCasePattern.test(password);
    const hasSpecialCharacter = specialCharacterPattern.test(password);

    const valid = hasUpperCase && hasLowerCase && hasSpecialCharacter && password.length >= 6 && password.length <= 12;

    return valid ? null : { invalidPassword: true };
  };
}