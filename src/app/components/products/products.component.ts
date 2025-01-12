import { RouterLink } from '@angular/router';
import { ProductService } from './../../core/service/product.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/Interfaces/IProduct';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { ToastrService } from 'ngx-toastr';
import { ActionLoadingComponent } from "../action-loading/action-loading.component";
import { PlacholderLoadingComponent } from "../placholder-loading/placholder-loading.component";
import { MetaDataProduct } from '../../core/Interfaces/meta-data-product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe, SearchPipe, ActionLoadingComponent, PlacholderLoadingComponent, NgFor, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);
  _FavariteService = inject(FavariteService);
  _ToastrService = inject(ToastrService);



  prodcuts: IProduct[] = [];
  searchword: string = '';
  arrayOfProductsIds: string[] = [];
  getAllProductSubscribe!: Subscription;
  isLoading: boolean = false;
  placholderLoading: boolean = true;
  metaData!: MetaDataProduct;
  page: number = 1;
  numberOfPages: number = 1;

  // functons >>
  onPageChange(page: number): void {
    this.getAllProducts(page)
  }
  getAllProducts(pageNumber: number = 1) {
    this.getAllProductSubscribe = this._ProductService.getAllProduct(pageNumber).subscribe({
      next: (res) => {
        this.prodcuts = res.data;
        this.metaData = res.metadata;
        this.page = this.metaData.currentPage;
        this.numberOfPages = this.metaData.numberOfPages;
        setTimeout(() => {
          this.placholderLoading = false;
        }, 2000);
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
    this.getAllProducts(this.page);
  }
  ngOnDestroy(): void {
    this.getAllProductSubscribe?.unsubscribe();
  }

  addToCart(id: string): void {
    this.isLoading = true;
    this._CartService.addToCart(id).subscribe({
      next: () => {
        this.isLoading = false;
        this._ToastrService.success('The product is added to cart');
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