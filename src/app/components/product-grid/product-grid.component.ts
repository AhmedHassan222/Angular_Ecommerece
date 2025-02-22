import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/Interfaces/IProduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss'
})
export class ProductGridComponent {
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  private readonly _FavariteService = inject(FavariteService);
  isLoadingFavarite: WritableSignal<boolean> = signal(false);
  isLoadingCart: WritableSignal<boolean> = signal(false);
  product: InputSignal<IProduct> = input({} as IProduct);
  styleImage: InputSignal<string> = input('');
  inFavarite: InputSignal<boolean> = input(false);
  productRemoved = signal<(() => void) | null>(null);

  addToCart(id: string): void {
    this.isLoadingCart.set(true);
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoadingCart.set(false);
    }, 2000);
  }


  addToFavarite(id: string): void {
    this.isLoadingFavarite.set(true);
    this._FavariteService.addToFavarite(id);
    setTimeout(() => {
      this.isLoadingFavarite.set(false);
    }, 2000);
  }

  removeFromFavarite(id: string) {
    this.isLoadingFavarite.set(true);
    this._FavariteService.deleteProductFromFavarite(id).subscribe({
      next: (res) => {
        this._FavariteService.numberOfItemsFavarite.set(res?.data?.length);
        this._ToastrService.error('The product is removed from wishlist');
        this.productRemoved()?.();
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete: () => {
        this.isLoadingFavarite.set(false);
      }
    })
  }

}
