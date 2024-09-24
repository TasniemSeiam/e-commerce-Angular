import { Component, Input } from '@angular/core';
import { Products } from '../type/products';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Products;
  constructor(config: NgbRatingConfig, private cartService: CartService) {
    config.max = 5;
    config.readonly = true;
  }
  addToCart() {
    this.cartService.addToCart(this.product);
    
  }
}
