import { Injectable } from '@angular/core';
import { CartItem } from '../cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  cartOpen?: boolean;
  
  constructor() {}
  addToCart(item: CartItem) {
    let existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already exists in cart
    } else {
      this.cartItems.push({ ...item, quantity: 1 }); // Add item to cart with quantity 1
    }
  }
  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    return this.cartItems;
  }
  decreaseCart(itemId: number){
    let decreaseItem = this.cartItems.find(item => item.id === itemId);
    if(decreaseItem){
      decreaseItem.quantity -= 1; 
    }
  }
  getCartItems(): CartItem[] {
    return this.cartItems;
  }
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}