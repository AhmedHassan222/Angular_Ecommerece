import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-grid',
  standalone: true,
  imports: [],
  templateUrl: './cart-grid.component.html',
  styleUrl: './cart-grid.component.scss'
})
export class CartGridComponent {
@Input() productInCart!:any;
@Output() productChanges = new EventEmitter<void>(); // Emit event to notify parent
isLoadingCart: boolean = false;
isLoadingClearAll: boolean = false;
isLoadingUpdateCount: boolean = false;
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);
  _FavariteService = inject(CartService);
  _ToastrService = inject(ToastrService);

updateQuantity(id: string, count: number): void {
  if (count <= 0) {
    this.removeProductFromCart(id);
  }
  else {
    this.isLoadingUpdateCount = true;
    this._CartService.updateQuantity(id, count).subscribe({
      next: () => {
        this.productChanges.emit();
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete:()=>{
        setTimeout(() => {
          this.isLoadingUpdateCount = false;
        }, 1000);
      }
    })
  }
}

removeProductFromCart(id: string): void {
  this.isLoadingCart = true;
  this._CartService.deleteProductFromCart(id).subscribe({
    next: (res) => {
      //start here 
      this._CartService.updateCartCount(res?.numOfCartItems);
      // end here
      this.productChanges.emit();
      this._ToastrService.error('The product is removed from cart');
    },
    error: (err) => {
      this._ToastrService.error(err?.error?.message);
    }, 
    complete:()=>{
      this.isLoadingCart = false;
    }
  })
}
}
