import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../cart-item';
import { StoresInfosService } from '../../service/stores-infos.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  User: any = {};
  checkoutForm!: FormGroup;
  cardForm!: FormGroup;
  checkoutValues: any;
  cartItems: CartItem[] = [];
  total: number = 0;
  storeName: string = '';
  storeInfos: any;
  disableButton: boolean = false;
  delivery_cost: number = 0;
  minimum_cost: number = 0;
  counter: number = 0;
  private timerSubscription: Subscription | undefined;
  showAlert: boolean=false;
  constructor(private titleService: Title, private router: Router, private formBuilder: FormBuilder, private cartService: CartService, private infoService: StoresInfosService) {
    titleService.setTitle("Checkout");
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.storeName = navigation.extras.state['storeName'];
    }
    // console.log("store name:",this.storeName);
  }
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems(this.storeName);
    this.total = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    // console.log("cart checkout", this.cartItems);
    // console.log("cart total", this.total);
    this.storeName = decodeURIComponent(this.storeName);
    // console.log("store name decodeURI:",this.storeName);
    this.infoService.getStoresInfos().subscribe((response: any) => {
      // console.log("all stores info", response);
      // this.storeInfos = response.filter((store: any) => store.name === this.storeName);
      // console.log("store info filtered by store name", this.storeInfos);
      response.forEach((store: any) => {
        if (store.name === this.storeName) {
          this.storeInfos = store;
          // console.log("stores info with store name", this.storeInfos);
          // this.counter = this.storeInfos.delivery_time;
          // console.log("delivery time", this.counter);
          // this.counter=this.counter*60;
          // console.log("delivery time in seconds", this.counter);
          // counter in order to see going to 00:00
          this.counter=60;
          this.delivery_cost = this.storeInfos.delivery_cost;
          // console.log("delivery",this.delivery_cost);
          this.minimum_cost = this.storeInfos.minimum_order;
          // console.log("minimum",this.minimum_cost);
          if (this.total + this.delivery_cost < this.minimum_cost) {
            this.disableButton = true;
            console.log("can't order", true);
            this.checkoutForm.markAllAsTouched();
            this.checkoutForm.disable();
          } else {
            this.disableButton = false;
            console.log("can't order", false);
          }
        }
      });
    });
    this.setFormValues();
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        this.showAlert=true;
      }
    });
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      // Parse the stored JSON string back into an object
      this.User = JSON.parse(storedUser);
      // console.log(this.User);
    } else {
      // Handle the case when no user information is stored in local storage
      console.log('No user information found in local storage');
    }
    // console.log(this.User.name);
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(this.User['name'] || '', [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      lastname: new FormControl(this.User['lastname'] || '', [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      telephone: new FormControl(this.User['telephone'] || '', [Validators.required, Validators.pattern("[0-9]{10}")]),
      email: new FormControl(this.User['email'] || '', [Validators.required, Validators.email]),
      address: new FormControl(this.User['address'] || ''),
      paymentMethod: new FormControl("", Validators.required),
      comments:new FormControl("")
    });
    this.cardForm.get('cardNumber')?.valueChanges.subscribe(value => {
      if (value) {
        // Remove any existing spaces
        let formattedValue = value.replace(/\s/g, '');
        // Insert a space after every 4 characters
        formattedValue = formattedValue.replace(/(.{4})/g, '$1 ').trim();
        // Update the value in the form control
        this.cardForm.get('cardNumber')?.setValue(formattedValue, { emitEvent: false });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  setFormValues() {
    // this.checkoutForm = new FormGroup({
    //   name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    //   lastname: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    //   telephone: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    //   email: new FormControl("", [Validators.required, Validators.email]),
    //   address: new FormControl(""),
    //   paymentMethod:new FormControl("",Validators.required)
    // });
    this.cardForm = new FormGroup({
      cardNumber: new FormControl("", [Validators.required, Validators.pattern('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}')]),
      cardHolderName: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      expireDate: new FormControl("", Validators.required),
      CVV: new FormControl("", [Validators.required, Validators.pattern("[0-9]{3}")]),
    });
  }
  onSubmit() {
    if (this.cardForm.valid) {
      // this.cardForm.disable();
    } else {
      Object.keys(this.cardForm.controls).forEach(controlName => {
        const control = this.cardForm.controls[controlName];
        // console.log(control);
        if (control.errors) {
          Object.keys(control.errors).forEach(errorType => {
            if (errorType === 'pattern') {
              // console.log(control);
              // console.log(`${controlName} pattern required.`);
              // console.log(this.cardForm.get('CVV')?.errors?.['pattern'])
              // console.log(this.cardForm.get('cardNumber')?.errors?.['pattern'])
            }
          });
        }
        if (control.errors?.['pattern']) {
          // console.log(control.errors?.['pattern']);
        }
      });
    }
    console.log(this.cardForm.value);
    if (this.checkoutForm.valid) {
    } else {
      Object.keys(this.checkoutForm.controls).forEach(controlName => {
        const control = this.checkoutForm.controls[controlName];
        // console.log(control);
        if (control.errors) {
          Object.keys(control.errors).forEach(errorType => {
            if (errorType === 'pattern') {
              // console.log(control);
              // console.log(`${controlName} pattern required.`);
              // console.log(this.checkoutForm.get('telephone')?.errors?.['pattern'])
            }
          });
        }
        if (control.errors?.['pattern']) {
          // console.log(control.errors?.['pattern']);
        }
      });
    }
    console.log(this.checkoutForm.value);
    if (this.checkoutForm.valid) {
      // Handle form submission
      console.log(this.checkoutForm.value);
    } else {
      // Mark form fields as touched to display validation errors
      this.checkoutForm.markAllAsTouched();
    }
  }
  removeSymbols(inputString: string): string {
    return inputString.replace(/[^a-zA-Z\- ]/g, ''); // This regular expression removes all characters except numbers and spaces
  }
  processString(inputString: string): string {
    // Remove all symbols except hyphens and curly brackets {}
    let stringWithHyphen = inputString.replace(/[^0-9\-{}]/g, '');
    // Add comma before numbers inside curly braces while keeping the curly braces
    return stringWithHyphen.replace(/{(\d+)}/g, ' {$1} ');
  }
  emptyCart(){
    // empties only if this cart haas items
    // this.cartItems=[];
    // console.log("empty cart on checkout",this.cartItems);
    this.cartService.clearAllCarts();
  }
}