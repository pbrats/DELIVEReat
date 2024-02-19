import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input()cartOpen?:boolean;
  @Output() actionEventEmitter =new EventEmitter();

  currentRoute: string = '';
  cartItems: CartItem[] = [];
  // cartOpen?:boolean;
  constructor(private router: Router,private cartService: CartService) {}
 
  ngOnInit(){
    // this.cartOpen=this.cartService.cartOpen;
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const parts = event.urlAfterRedirects.split('/');
      if (parts.length>2){
        // console.log('leitourgei',parts);
        // console.log('cartOpen',this.cartOpen);
        // this.cartOpen=true;
        if(event.urlAfterRedirects.split('/')[1]='stores'){
          this.currentRoute = event.urlAfterRedirects.split('/')[1];
          // this.cartService.cartOpen = true;
        }
      }else{
        this.currentRoute=''
        // console.log("allagi");
        // console.log('cartOpen',this.cartOpen);
        // this.cartOpen=false;
      }
    });
    this.cartItems = this.cartService.getCartItems();
  }
  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.cartItems = this.cartService.getCartItems(); // Refresh cart items after removal
    return this.cartItems;
  }
  decreaseCart(itemId: number){
    this.cartService.decreaseCart(itemId);
    this.cartItems = this.cartService.getCartItems(); // Refresh cart items after decrease quantity
    return this.cartItems;
  }
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems(); // Refresh cart items after clear
    return this.cartItems;
  }
  change(status:boolean){
    // if(this.cartOpen){
      this.actionEventEmitter.emit(status);
      // this.cartOpen=false;
    // }
  }
}
