import { CurrencyPipe } from '@angular/common';
import { IProductsInCart } from '../../core/Interfaces/iproducts-in-cart';
import { CartService } from './../../core/service/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { FavariteService } from '../../core/service/favarite.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlacholderLoadingComponent } from '../placholder-loading/placholder-loading.component';
import { ActionLoadingComponent } from "../action-loading/action-loading.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, PlacholderLoadingComponent, ActionLoadingComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  _CartService = inject(CartService)
  _FavariteService = inject(FavariteService)
  _ToastrService = inject(ToastrService)
  productsInCart!: IProductsInCart;
  isLoading: boolean = false;
  placeholerLoading: boolean = true;
  ngOnInit(): void {
    this._CartService.getAllPrductsCart().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.placeholerLoading = false;
        }, 2000);
        this.productsInCart = res?.data;
      },
      error: (err) => {
        setTimeout(() => {
          this.placeholerLoading = false;
        }, 2000);
        this._ToastrService.error(err?.error?.message);
      }
    })
  }

  updateQuantity(id: string, count: number): void {
    this.isLoading = true;
    if (count <= 0) {
      this.isLoading = false;
      this.removeProductFromCart(id);
    }
    else {
      this._CartService.updateQuantity(id, count).subscribe({
        next: (res) => {
          this.isLoading = false;
          this._ToastrService.success('The count updated');
          this.productsInCart = res?.data;
        },
        error: (err) => {
          this.isLoading = false;
          this._ToastrService.error(err?.error?.message);
        }
      })
    }
  }

  removeProductFromCart(id: string): void {
    this.isLoading = true;
    this._CartService.deleteProductFromCart(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.productsInCart = res.data;
        this._ToastrService.error('The product is removed from cart');
      },
      error: (err) => {
        this.isLoading = false;
        this._ToastrService.error(err?.error?.message);
      }
    })

  }
  clearAll(): void {
    this.isLoading = true;
    this._CartService.ClearAllProductsFromCart().subscribe({
      next: () => {
        this.isLoading = false;
        this.productsInCart.products = [];
        this.productsInCart.totalCartPrice = 0;
        this._ToastrService.error("All producs are removed from cart.");

      },
      error: (err) => {
        this.isLoading = false;
        this._ToastrService.error(err?.error?.message);
      }
    })
  }
  addToFavarite(id: string): void {
    this.isLoading = true;
    this._FavariteService.addToFavarite(id).subscribe({
      next: () => {
        this.isLoading = false;
        this._ToastrService.success('The product is added to wishlist');
      },
      error: (err) => {
        this.isLoading = false;
        this._ToastrService.error(err?.error?.message);
      }
    })
  }
}
