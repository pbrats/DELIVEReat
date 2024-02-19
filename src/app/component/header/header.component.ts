import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../cart-item';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, FormsModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  form!: FormGroup;
  searchQuery: string = '';
  currentRoute: string = '';
  exception?: string;
  cartOpen: boolean = false;
  cartItems: CartItem[] = [];
  storeName: string = '';
  cartItemsSubscription: any;
  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) {
    // this.router.events.subscribe((event) => console.log(event));
  }
  ngOnInit() {
    this.cartItemsSubscription = this.cartService.cartItemsUpdated.subscribe(cartItems => {
      this.cartItems = cartItems[this.storeName] || [];
      // console.log("cart header", this.cartItems);
    });
    // this.cartItems = this.cartService.getCartItems(this.storeName);
    // this.router.events
    // .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   this.currentRoute = event.urlAfterRedirects.split('/')[1];
    // });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
        const parts = event.urlAfterRedirects.split('/');
        // console.log("currentRoute:", this.currentRoute);
        if (parts.length > 2) {
          // console.log("part>2 route:", this.currentRoute);
          if (event.urlAfterRedirects.split('/')[1] == 'stores') {
            this.exception = event.urlAfterRedirects.split('/')[1];
            this.storeName = event.urlAfterRedirects.split('/')[2];
            // console.log("exception url/stores/storeName:", this.exception);
          }
        } else {
          this.exception = '';
          // console.log("exception url/something:", this.exception);
        }
      }
    });
    this.setFormValues();
  }
  setFormValues() {
    this.form = new FormGroup({
      searchData: new FormControl("", [Validators.required])
    });
  }
  onSubmit() {
    // console.log(this.form.get("searchData")?.value);
    this.searchQuery = this.form.get("searchData")?.value;
    // console.log(this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }
  changeCartStatus() {
    // if(this.cartOpen){
    //   this.cartOpen=false;
    // }else{
    //   this.cartOpen=true;
    // }
    this.cartOpen = !this.cartOpen;
    this.cartItems = this.cartService.getCartItems(this.storeName);
  }
  change(event: any) {
    this.cartOpen = event;
    // console.log("event",event);
  }
}