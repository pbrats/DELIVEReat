import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  signUpValues: any;
  userService: UsersService=inject(UsersService);
  showErrorAlert = false;

  constructor(private router: Router,private route: ActivatedRoute){}
  ngOnInit() {
    this.setFormValues();
  }
  setFormValues(){
    this.signUpForm= new FormGroup({
      email : new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(4),Validators.maxLength(4)])
    });
  }
  onSubmit() { 
   
      this.signUpValues=this.signUpForm.value;
      console.log( this.signUpValues);
      console.log(this.signUpForm.value);
  }
  closeErrorAlert() {
    this.showErrorAlert = false;
  }
}