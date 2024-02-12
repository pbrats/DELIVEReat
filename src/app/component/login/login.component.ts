import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginValues: any;
  userService: UsersService=inject(UsersService);
  showErrorAlert: boolean = false;
  // isAuthenticated:boolean=false;
  private currentTime: Date = new Date();
 
  constructor(private router: Router){}
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
      let typedemail = this.loginForm.value.email;
      let typedpassword = this.loginForm.value.password;
      this.userService.authenticate(typedemail, typedpassword).subscribe(authenticatedUser => {
        if (authenticatedUser) {
          // this.isAuthenticated = true;
          // Authentication successful, you can navigate or perform other actions
          console.log('Login successful!');
          console.log(authenticatedUser)
          this.showErrorAlert = false;
          // this.shouldCloseOffcanvas();
          localStorage.setItem('lastVisit',JSON.stringify(this.currentTime));
          localStorage.setItem('alertShown','no');
          localStorage.setItem('User', JSON.stringify(authenticatedUser));
          // sessionStorage.setItem('User', JSON.stringify(authenticatedUser));
          this.router.navigate(["discovery"]);
          // this.router.navigate(["discovery"],{ queryParams: { loginSuccess: true } });
        } else {
          // Authentication failed, show error message or take appropriate action
          console.log('Invalid email or password');
          // this.isAuthenticated = false;
          // console.log(authenticatedUser)
          this.showErrorAlert = true;
          // this.shouldCloseOffcanvas();
        }
      });
      // console.log(this.loginForm);
      // this.loginValues=this.loginForm.value;
      // console.log(this.loginValues);
      // console.log(this.loginForm.value);
      // console.log(this.loginForm.value.email);
      // console.log(this.loginForm.value.password);
      if(this.loginForm.valid){
        console.log("valid!");
        this.loginForm.reset();
      } else {
        console.log("invalid");
      }
  }

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

  // shouldCloseOffcanvas(): boolean {
  //   if(!this.showErrorAlert){
  //     if (this.isAuthenticated) {
  //     return this.isAuthenticated;
  //     // return false;
  //     }else{
  //       // return this.isAuthenticated
  //       return false;
  //     }
  //   }else{
  //     return false;
  //   }
  // }
  closeErrorAlert() {
    this.showErrorAlert = false;
  }
  resetForm(){
    this.loginForm.reset();
  }
}
