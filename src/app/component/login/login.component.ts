import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SignUpComponent,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginValues: any;
  userService: UsersService=inject(UsersService);
  showErrorAlert = false;

  constructor(private router: Router,private route: ActivatedRoute){}
  ngOnInit() {
    this.setFormValues();
  }
  setFormValues(){
    this.loginForm= new FormGroup({
      email : new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(4),Validators.maxLength(4)])
    });
  }
  onSubmit() { 
    // if (this.loginForm.valid) {
      // this.loginValues=this.loginForm.get("email")?.value;
      // console.log( this.loginValues);
      // this.loginValues=this.loginForm.get("password")?.value;
      // console.log( this.loginValues);
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.userService.authenticate(email, password).subscribe(authenticatedUser => {
        if (authenticatedUser) {
          // Authentication successful, you can navigate or perform other actions
          console.log('Login successful!');
          console.log(authenticatedUser)
          this.showErrorAlert = false;
          localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
          this.router.navigate(["discovery"],{ queryParams: { loginSuccess: true } });
        
          // this.showAlertFlag = true;
          // const dataToSend = this.showAlertFlag;
          // this.shareDataService.setData(dataToSend);
        } else {
          // Authentication failed, show error message or take appropriate action
          console.log('Invalid email or password');
          console.log(authenticatedUser)
          this.showErrorAlert = true;
        }
      });
      this.loginValues=this.loginForm.value;
      console.log( this.loginValues);
      console.log(this.loginForm.value);
  }
  // onSubmit() { 
  //   // if (this.loginForm.valid) {
  //     // this.loginValues=this.loginForm.get("email")?.value;
  //     // console.log( this.loginValues);
  //     // this.loginValues=this.loginForm.get("password")?.value;
  //     // console.log( this.loginValues);
  //     let email = this.loginForm.value.email;
  //     let password = this.loginForm.value.password;
  //     this.userService.authenticate(email, password).subscribe(authenticatedUser => {
  //       if (authenticatedUser) {
  //         // Authentication successful, you can navigate or perform other actions
  //         console.log('Login successful!');
  //         console.log(authenticatedUser)
  //         this.showErrorAlert = false;
  //         localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
  //         this.router.navigate(["discovery"],{ queryParams: { loginSuccess: true } });
        
  //         // this.showAlertFlag = true;
  //         // const dataToSend = this.showAlertFlag;
  //         // this.shareDataService.setData(dataToSend);
  //       } else {
  //         // Authentication failed, show error message or take appropriate action
  //         console.log('Invalid email or password');
  //         console.log(authenticatedUser)
  //         this.showErrorAlert = true;
  //       }
  //     });
    
  //     this.loginValues=this.loginForm.value;
  //     console.log( this.loginValues);
  //     console.log(this.loginForm.value);
  //     // this.router.navigate(["discovery"]);
  //     // this.showAlertFlag = true;
  //     // const dataToSend = this.showAlertFlag;
  //     // this.shareDataService.setData(dataToSend);
  //     // const dataToSend2 = this.loginValues;
  //     // this.shareDataService.setData(dataToSend2);

  //   // } else {
  //   //   Object.keys(this.loginForm.controls).forEach(controlName => {
  //   //     const control = this.loginForm.controls[controlName];
  //   //     console.log(control);
  //   //     if (control.errors) {
  //   //       Object.keys(control.errors).forEach(errorType => {
  //   //         if (errorType === 'required') {
  //   //           console.log(`${controlName} is required.`);
  //   //         } else if (errorType === 'email') {
  //   //           console.log(`${controlName} has an invalid email format.`);
  //   //         } else if (errorType === 'minlength') {
  //   //           console.log(`${controlName} must be at least ${control.errors?.['minlength'].requiredLength} characters.`);
  //   //         }
  //   //       });
  //   //     }
  //   //   });
  //   // }
  // }
  // closeErrorAlert() {
  //   this.showErrorAlert = false;
  // }
  closeErrorAlert() {
    this.showErrorAlert = false;
  }

}
