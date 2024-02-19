import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordMatcher } from '../../password-matcher';
import { passwordValidator } from '../../passwordValidator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  signUpValues: any;
  private currentTime: Date = new Date();

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.setFormValues();
  }
  setFormValues() {
    this.signUpForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastname: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      // telephone: new FormControl("", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      telephone: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      email: new FormControl("", [Validators.required, Validators.email]),
      // postalCode : new FormControl("",[Validators.minLength(4),Validators.maxLength(4)]),
      postalCode: new FormControl("", Validators.pattern("[0-9 ]{5}")),
      address: new FormControl(""),
      // password: new FormControl("", [Validators.required, Validators.minLength(8),Validators.maxLength(12)]),
      password: new FormControl("", [Validators.required, passwordValidator()]),
      // confirmPassword: new FormControl("", Validators.required)
      confirmPassword: new FormControl("")
    }, { validators: PasswordMatcher.match });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      localStorage.setItem('lastVisit', JSON.stringify(this.currentTime));
      localStorage.setItem('alertShown', 'no');
      localStorage.setItem('User', JSON.stringify(this.signUpForm.value));
      // sessionStorage.setItem("User",JSON.stringify(this.signUpForm.value));
      this.signUpValues = this.signUpForm.value;
      // console.log(this.signUpValues);
      // console.log(this.signUpForm.value);
      this.router.navigate(["discovery"]);
      this.signUpForm.reset();
    } else {
      Object.keys(this.signUpForm.controls).forEach(controlName => {
        const control = this.signUpForm.controls[controlName];
        // console.log(control);
        if (control.errors) {
          Object.keys(control.errors).forEach(errorType => {
            if (errorType === 'pattern') {
              // console.log(control);
              // console.log(`${controlName} pattern required.`);
              // console.log(this.signUpForm.get('telephone')?.errors?.['pattern'])
            }
          });
        }
        if (control.errors?.['pattern']) {
          // console.log(control.errors?.['pattern']);
        }
      });
    }
  }
  removeSymbols(inputString: string): string {
    return inputString.replace(/[^a-zA-Z\- ]/g, ''); // This regular expression removes all characters except numbers and spaces
  }
  processString(inputString: string): string {
    // Remove all symbols except hyphens
    let stringWithHyphen = inputString.replace(/[^0-9\-{}]/g, '');
    // Add comma before numbers inside curly braces
    return stringWithHyphen.replace(/{(\d+)}/g, ', with $1');
  }
}