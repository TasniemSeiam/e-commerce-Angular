import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Products } from '../type/products';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Products[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(){
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }
  increaseItem(item: Products) {
    this.cartService.increaseQuantity(item);
  }

  decreaseItem(item: Products) {
    this.cartService.decreaseQuantity(item);
  }
  // changeQuantity(product: Products, quantity: number) {
  //   this.cartService.changeItemQuantity(product, quantity);
  // }

  removeItem(product: Products) {
    this.cartService.removeFromCart(product);
  }
}
