import { Component, EventEmitter, inject, Output, WritableSignal, signal, input, InputSignal } from '@angular/core';
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
  productInCart: InputSignal<any> = input(null);
  @Output() productChanges = new EventEmitter<void>(); // Emit event to notify parent
  isLoadingCart: WritableSignal<boolean> = signal(false);
  isLoadingClearAll: WritableSignal<boolean> = signal(false);
  isLoadingUpdateCount: WritableSignal<boolean> = signal(false);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  updateQuantity(id: string, count: number): void {
    if (count <= 0) {
      this.removeProductFromCart(id);
    }
    else {
      this.isLoadingUpdateCount.set(true);
      this._CartService.updateQuantity(id, count).subscribe({
        next: () => {
          this.productChanges.emit();
        },
        complete: () => {
          setTimeout(() => {
            this.isLoadingUpdateCount.set(false);
          }, 1000);
        }
      })
    }
  }

  removeProductFromCart(id: string): void {
    this.isLoadingCart.set(true);
    this._CartService.deleteProductFromCart(id).subscribe({
      next: () => {
        this._CartService.numberOfItemsInCart.update(val => val - 1)
        this.productChanges.emit();
        this._ToastrService.error('The product is removed from cart');
      },
      complete: () => {
        this.isLoadingCart.set(false);
      }
    })
  }
}
