import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  FormData!: FormGroup;
  showAlertFlag: boolean = false;
  showAlert() {
    this.showAlertFlag = true;
    // timeout to hide the alert after a certain duration
    setTimeout(() => {
      this.showAlertFlag = false;
    }, 5000);
  }
  constructor(private titleService: Title, private router: Router, private builder: FormBuilder) {
    titleService.setTitle("Support");
  }
  ngOnInit() {
    this.setFormValues();
  }
  setFormValues() {
    this.FormData = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', (Validators.compose([Validators.required, Validators.email]))),
      comment: new FormControl('', [Validators.required])
    })
  }
  onSubmit() {
    console.log(this.FormData.value)
    this.FormData.reset();
    // alert("your form was submitted");
  }
  removeSymbols(inputString: string): string {
    return inputString.replace(/[^a-zA-Z\- ]/g, ''); // This regular expression removes all characters except numbers and spaces
  }
}
