import { EventEmitter, Injectable } from '@angular/core';
import { CartItem } from '../cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: { [storeName: string]: CartItem[] } = {};
  cartOpen?: boolean;
  cartItemsUpdated = new EventEmitter<{ [storeName: string]: CartItem[] }>();
  constructor() { }

  addToCart(item: CartItem, storeName: string) {
    if (!this.cartItems[storeName]) {
      this.cartItems[storeName] = [];
    }
    let existingItem = this.cartItems[storeName].find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already exists in cart
    } else {
      this.cartItems[storeName].push({ ...item, quantity: 1 }); // Add item to cart with quantity 1
    }
    this.cartItemsUpdated.emit(this.cartItems);
  }
  removeFromCart(itemId: number, storeName: string) {
    if (this.cartItems[storeName]) {
      this.cartItems[storeName] = this.cartItems[storeName].filter(item => item.id !== itemId);
    }
    this.cartItemsUpdated.emit(this.cartItems);
  }
  decreaseCart(itemId: number, storeName: string) {
    let decreaseItem = this.cartItems[storeName].find(item => item.id === itemId);
    if (decreaseItem && decreaseItem.quantity > 1) {
      decreaseItem.quantity -= 1;
    } else {
      this.removeFromCart(itemId, storeName);
    }
    this.cartItemsUpdated.emit(this.cartItems);
  }
  getCartItems(storeName: string): CartItem[] {
    return this.cartItems[storeName] || [];
  }
  getTotal(storeName: string): number {
    const items = this.cartItems[storeName] || [];
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  clearCart(storeName: string) {
    this.cartItems[storeName] = [];
    this.cartItemsUpdated.emit(this.cartItems);
  }
  clearAllCarts() {
    // Clear all carts
    for (const storeName in this.cartItems) {
      if (this.cartItems.hasOwnProperty(storeName)) {
        this.cartItems[storeName] = [];
      }
    }
    this.cartItemsUpdated.emit(this.cartItems);
  }
}