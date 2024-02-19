import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() cartOpen?: boolean;
  @Input() storeName!: string;
  @Output() actionEventEmitter = new EventEmitter();
  currentstoreName: string = '';
  currentRoute: string = '';
  cartItems: CartItem[] = [];
  total: number = 0;
  cartItemsSubscription: any;
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const parts = event.urlAfterRedirects.split('/');
        if (parts.length > 2) {
          if (event.urlAfterRedirects.split('/')[1] = 'stores') {
            this.currentRoute = event.urlAfterRedirects.split('/')[1];
            this.currentstoreName = event.urlAfterRedirects.split('/')[2];
            // console.log('cart current store name:',this.currentstoreName);
          }
        } else {
          this.currentRoute = ''
        }
      });
    // console.log("input Store name", this.storeName);
    // console.log("current Store name", this.currentstoreName);
    // this.cartItems = this.cartService.getCartItems(this.currentstoreName);
    // console.log(this.cartItems);
    // this.cartItems = this.cartService.getCartItems(this.storeName);
    // console.log(this.cartItems);
    // this.getTotal();
    this.cartItemsSubscription = this.cartService.cartItemsUpdated.subscribe(cartItems => {
      this.cartItems = cartItems[this.currentstoreName] || [];
      this.getTotal();
      // console.log("cart on init", this.cartItems);
      // console.log("cart total on init ", this.getTotal());
    });
  }
  getTotal(): number {
    this.total = this.cartService.getTotal(this.currentstoreName);
    return this.total;
  }
  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId, this.currentstoreName);
    this.cartItems = this.cartService.getCartItems(this.currentstoreName); // Refresh cart items after removal
    return this.cartItems;
  }
  decreaseCart(itemId: number) {
    this.cartService.decreaseCart(itemId, this.currentstoreName);
    this.cartItems = this.cartService.getCartItems(this.currentstoreName); // Refresh cart items after decrease quantity
    return this.cartItems;
  }
  clearCart() {
    this.cartService.clearCart(this.currentstoreName);
    this.cartItems = this.cartService.getCartItems(this.currentstoreName); // Refresh cart items after clear
    return this.cartItems;
  }
  change(status: boolean) {
    this.actionEventEmitter.emit(status);
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes:", changes);
    if (changes['storeName']) {
      this.cartItems = this.cartService.getCartItems(this.currentstoreName);
      this.getTotal();
      // console.log("cart on changes", this.cartItems);
      // console.log("cart total on changes", this.getTotal());
    }
  }
  ngOnDestroy() {
    // console.log("destroy");
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }
}