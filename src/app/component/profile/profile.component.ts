import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  User: any = {};
  lastVisit: any;
  profileForm!: FormGroup;

  constructor(private titleService: Title, private formBuilder: FormBuilder) {
    titleService.setTitle("Profile");
  }
  ngOnInit() {
    const storedUser = localStorage.getItem('User');
    let storedVisit = localStorage.getItem('lastVisit');
    if (storedUser) {
      // Parse the stored JSON string back into an object
      this.User = JSON.parse(storedUser);
      // console.log("initial user:",this.User);
      if (storedVisit) {
        let time = JSON.parse(storedVisit);
        this.lastVisit = formatDate(time, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200');
      }
    } else {
      // Handle the case when no user information is stored in local storage
      console.log('No user information found in local storage');
    }
    this.profileForm = this.formBuilder.group({
      name: new FormControl(this.User['name'] || '',),
      lastname: new FormControl(this.User['lastname'] || '',),
      previous_orders: new FormControl(this.User['previous_orders'] || '',),
      photo: new FormControl(this.User['photo'] || '',),
      telephone: new FormControl(this.User['telephone'] || '', [Validators.required, Validators.pattern("[0-9]{10}")]),
      email: new FormControl(this.User['email'] || '', [Validators.required, Validators.email]),
      address: new FormControl(this.User['address'] || ''),
      postalCode: new FormControl(this.User['postalCode'] || '', Validators.pattern("[0-9]{5}")),
      password: new FormControl(this.User['password'] || '', Validators.pattern("[a-zA-Z0-9]{4,}"))
    });
  }
  onSubmit() {
    if (this.profileForm.valid) {
      localStorage.setItem('User', JSON.stringify(this.profileForm.value));
      const storedUser = localStorage.getItem('User');
      if (storedUser) {
        // Parse the stored JSON string back into an object
        this.User = JSON.parse(storedUser);
        // console.log("updated user:",this.User);
      }
      console.log("form valid, profile updated");
    } else {
      console.log("form invalid");
      Object.keys(this.profileForm.controls).forEach(controlName => {
        const control = this.profileForm.controls[controlName];
        // console.log(control);
        if (control.errors) {
          Object.keys(control.errors).forEach(errorType => {
            if (errorType === 'pattern') {
              // console.log(control);
              // console.log(`${controlName} pattern required.`);
              // console.log(this.profileForm.get('password')?.errors?.['pattern']);
              // console.log(this.profileForm.get('postalCode')?.errors?.['pattern']);
            }
          });
        }
        if (control.errors?.['pattern']) {
          // console.log(control.errors?.['pattern']);
        }
      });
    }
    // console.log(this.profileForm.value);
  }
  processString(inputString: string): string {
    let stringWithHyphen = inputString.replace(/[^0-9a-zA-Z\-{}]/g, '');
    return stringWithHyphen.replace(/{(\d+)}/g, ', with $1');
  }
  SignOut() {
    sessionStorage.clear();
    localStorage.clear();
  }
}

