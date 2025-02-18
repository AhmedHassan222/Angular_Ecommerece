import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FavariteService } from '../../core/service/favarite.service';
import { CartService } from '../../core/service/cart.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../core/Interfaces/IProduct';
import { ActionLoadingComponent } from "../action-loading/action-loading.component";
import { ToastrService } from 'ngx-toastr';
import { PlacholderLoadingComponent } from "../placholder-loading/placholder-loading.component";
import { ProductGridComponent } from "../product-grid/product-grid.component";

@Component({
  selector: 'app-favarite',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ActionLoadingComponent, PlacholderLoadingComponent, ProductGridComponent],
  templateUrl: './favarite.component.html',
  styleUrl: './favarite.component.scss'
})
export class FavariteComponent implements OnInit, OnDestroy {
  _FavariteService = inject(FavariteService);
  _CartService = inject(CartService);
  _ToastrService = inject(ToastrService);

  prodcuts: IProduct[] = [];
  addToFavariteError: string = '';
  getAllProductSubscribe!: Subscription;
  isLoadingFavarite: boolean = false;
  isLoadingCart: boolean = false;
  placholderLoading: boolean = true;

  // functons >>
  getAllProductsFavarite() {
    this.getAllProductSubscribe = this._FavariteService.getAllPrductsFavarites().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.placholderLoading = false;
        }, 2000);
        this.prodcuts = res.data;
      },
      error: (err) => {
        setTimeout(() => {
          this.placholderLoading = false;
        }, 2000);
        this._ToastrService.error(err?.error?.message);

      }
    })
  }
  ngOnInit(): void {
    this.getAllProductsFavarite();
  }
  ngOnDestroy(): void {
    this.getAllProductSubscribe?.unsubscribe();
  }

  addToCart(id: string): void {
    this.isLoadingCart = true;
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoadingCart = false;
    }, 2000);
  }



  removeFromFavarite(id: string) {
    this.isLoadingFavarite = true;
    this._FavariteService.deleteProductFromFavarite(id).subscribe({
      next: (res) => {
        //start here 
        this._FavariteService.updatefavariteCount(res?.data?.length);
        // end here       
        this._ToastrService.error('The product is removed from wishlist');
        this.getAllProductsFavarite();
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete:()=>{
        this.isLoadingFavarite = false;
      }
    })
  }
}
