import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../type/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Products[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private cart = new BehaviorSubject<Products[]>([]);

  getCart() {
    return this.cart.asObservable();
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: Products) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) { 
        existingItem.quantity += 1;
      }
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.updateCart();
  }

  removeFromCart(product: Products) {
    this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
    this.updateCart();
  }

  increaseQuantity(product: Products) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem && existingItem.quantity < product.stock) {
      existingItem.quantity += 1;
      this.updateCart();
    }
  }

  decreaseQuantity(product: Products) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      this.updateCart();
    } 
  }
  private updateCart() {
    this.cart.next(this.cartItems);
    const count = this.cartItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    this.cartItemCount.next(count);
  }
}
