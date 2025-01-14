import { CurrencyPipe } from '@angular/common';
import { IProductsInCart } from '../../core/Interfaces/iproducts-in-cart';
import { CartService } from './../../core/service/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FavariteService } from '../../core/service/favarite.service';
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
export class CartComponent implements OnInit  {
  _CartService = inject(CartService)
  _FavariteService = inject(FavariteService)
  _ToastrService = inject(ToastrService)
  productsInCart!: IProductsInCart;
  // isLoadingCart: boolean = false;
  isLoadingClearAll: boolean = false;
  // isLoadingUpdateCount: boolean = false;
  placeholerLoading: boolean = false;

  getAllProductsInCart():void {
    this._CartService.getAllPrductsCart().subscribe({
      next: (res) => {
        this.productsInCart = res?.data;
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete:()=>{
        this.placeholerLoading = false;
      }
    })

  }
  ngOnInit(): void {
    this.placeholerLoading = true;
    this.getAllProductsInCart();
  }



  // updateQuantity(id: string, count: number): void {
  //   if (count <= 0) {
  //     this.removeProductFromCart(id);
  //   }
  //   else {
  //     this.isLoadingUpdateCount = true;
  //     this._CartService.updateQuantity(id, count).subscribe({
  //       next: (res) => {
  //         this._ToastrService.success('The count updated');
  //         this.productsInCart = res?.data;
  //       },
  //       error: (err) => {
  //         this._ToastrService.error(err?.error?.message);
  //       },
  //       complete:()=>{
  //         this.isLoadingUpdateCount = false;
  //       }
  //     })
  //   }
  // }

  // removeProductFromCart(id: string): void {
  //   this.isLoadingCart = true;
  //   this._CartService.deleteProductFromCart(id).subscribe({
  //     next: (res) => {
  //       //start here 
  //       this._CartService.updateCartCount(res?.numOfCartItems);
  //       // end here
  //       this.productsInCart = res.data;
  //       this._ToastrService.error('The product is removed from cart');
  //     },
  //     error: (err) => {
  //       this._ToastrService.error(err?.error?.message);
  //     }, 
  //     complete:()=>{
  //       this.isLoadingCart = false;
  //     }
  //   })
  // }
  clearAll(): void {
    this.isLoadingClearAll = true;
    this._CartService.ClearAllProductsFromCart().subscribe({
      next: () => {
        //start here 
        this._CartService.updateCartCount(0);
        // end here
        this.productsInCart.products = [];
        this.productsInCart.totalCartPrice = 0;
        this._ToastrService.error("All producs are removed from cart.");

      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete: () => {
        this.isLoadingClearAll = false;
      }
    })
  }

}
