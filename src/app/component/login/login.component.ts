import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { NavigationEnd, Router, RouterLink} from '@angular/router';
import { Subscription, filter } from 'rxjs';

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
  @Input()showOffcanvas?: boolean;
  // @ViewChild('offcanvasRight') offcanvas!: ElementRef;
  // private authenticationSubscription: Subscription | undefined;
  // currentRoute: string = '';
  constructor(private router: Router, private renderer: Renderer2){}
  ngOnInit() {
    // this.router.events
    // .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   this.currentRoute = event.urlAfterRedirects.split('/')[1];
    // });
    this.setFormValues();
  }
  setFormValues(){
    this.loginForm= new FormGroup({
      email : new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(4),Validators.maxLength(4)])
    });
  }
  onSubmit() { 
    // if (this.authenticationSubscription) {
    //   this.authenticationSubscription.unsubscribe();
    // }
    // if (this.loginForm.valid) {
      // this.loginValues=this.loginForm.get("email")?.value;
      // console.log( this.loginValues);
      // this.loginValues=this.loginForm.get("password")?.value;
      // console.log( this.loginValues);
      let typedemail = this.loginForm.value.email;
      let typedpassword = this.loginForm.value.password;
      // this.authenticationSubscription = this.userService.authenticate(typedemail, typedpassword).subscribe(authenticatedUser => {
      this.userService.authenticate(typedemail, typedpassword).subscribe(authenticatedUser => {
        if (authenticatedUser) {
          // this.isAuthenticated = true;
          // Authentication successful, you can navigate or perform other actions
          console.log('Login successful!');
          console.log(authenticatedUser)
          this.showErrorAlert = false;
          localStorage.setItem('lastVisit',JSON.stringify(this.currentTime));
          localStorage.setItem('alertShown','no');
          localStorage.setItem('User', JSON.stringify(authenticatedUser));
          // sessionStorage.setItem('User', JSON.stringify(authenticatedUser));

          // this.closeOffcanvas();
          this.showOffcanvas=false;
          this.router.navigate(["discovery"]);
          // this.router.navigate(["discovery"],{ queryParams: { loginSuccess: true } });
        } else {
          // Authentication failed, show error message or take appropriate action
          console.log('Invalid email or password');
          // this.isAuthenticated = false;
          // console.log(authenticatedUser)
          this.showErrorAlert = true;
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
  // ngOnDestroy() {
  //   // Unsubscribe from authentication subscription when component is destroyed
  //   if (this.authenticationSubscription) {
  //     this.authenticationSubscription.unsubscribe();
  //   }
  // }
  // closeOffcanvas() {
  //   const offcanvasElement = this.offcanvas.nativeElement as HTMLElement;
  //   this.renderer.setStyle(offcanvasElement, 'display', 'none');
  // }
  closeErrorAlert() {
    this.showErrorAlert = false;
  }
  resetForm(){
    this.loginForm.reset();
  }
}
