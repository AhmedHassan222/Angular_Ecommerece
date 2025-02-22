import { CurrencyPipe } from '@angular/common';
import { IProductsInCart } from '../../core/models/iproducts-in-cart';
import { CartService } from './../../core/service/cart.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartLoadingComponent } from "../cart-loading/cart-loading.component";
import { CartGridComponent } from "../cart-grid/cart-grid.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CartLoadingComponent, CartGridComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService)
  productsInCart: WritableSignal<IProductsInCart | null> = signal<IProductsInCart | null>(null);
  isLoadingClearAll: WritableSignal<boolean> = signal<boolean>(false);
  placeholerLoading: WritableSignal<boolean> = signal<boolean>(false);

  getAllProductsInCart(): void {
    this._CartService.getAllPrductsCart().subscribe({
      next: (res) => {
        this.productsInCart.set(res?.data);
      },
      complete: () => {
        this.placeholerLoading.set(false);
      }
    })

  }
  ngOnInit(): void {
    this.placeholerLoading.set(true);
    this.getAllProductsInCart();
  }

  clearAll(): void {
    this.isLoadingClearAll.set(true);
    this._CartService.ClearAllProductsFromCart().subscribe({
      next: () => {
        this.productsInCart.set(null);
        this._CartService.numberOfItemsInCart.set(0);
        this._ToastrService.error("All producs are removed from cart.");

      },
      complete: () => {
        this.isLoadingClearAll.set(false);
      }
    })
  }

}
