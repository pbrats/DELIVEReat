import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../cart-item';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,ReactiveFormsModule,FormsModule,CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  form!: FormGroup;
  searchQuery: string = '';
  currentRoute: string = '';
  cartOpen:boolean=false;
  // cartOpen?:boolean;
  cartItems: CartItem[] = [];
  constructor(private route: ActivatedRoute,private router: Router,private cartService: CartService){
    // this.router.events.subscribe((event) => console.log(event));
  }
  ngOnInit(){
    // this.cartOpen=this.cartService.cartOpen;
    // this.cartOpen=false;
    // this.cartService.cartOpen=this.cartOpen;
    // this.cartItems = this.cartService.getCartItems();
    // this.router.events
    // .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   this.currentRoute = event.urlAfterRedirects.split('/')[1];
    // });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
    this.setFormValues();
  }
  setFormValues(){
    this.form= new FormGroup({
      searchData : new FormControl("",[Validators.required])
    });
  }
  onSubmit() {
    // console.log(this.form.get("searchData")?.value);
    this.searchQuery=this.form.get("searchData")?.value;
    console.log( this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }
  changeCartStatus(){
    if(this.cartOpen){
      this.cartOpen=false;
    }else{
      this.cartOpen=true;
    }
    console.log("before",this.cartService.getCartItems());
    this.cartItems = this.cartService.getCartItems();
    console.log("after",this.cartService.getCartItems());
    console.log(this.cartService.getTotal());
    // Set cartOpen to true to keep the offcanvas cart open
    // this.cartService.cartOpen = true;
    // if (this.cartService.cartOpen){
    //   this.cartService.cartOpen=false;
    // }else{
    //   this.cartService.cartOpen=true;
    // }
    // if(this.cartOpen){
    //   this.cartService.cartOpen = false;
    //   this.cartOpen=this.cartService.cartOpen;
    //   // EventEmitter
    // }else{
    //   this.cartService.cartOpen = true;
    //   this.cartOpen=this.cartService.cartOpen;
    //   // emit cartopen sto cart
    // }
  }
}