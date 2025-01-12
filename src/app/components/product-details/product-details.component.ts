import { IProduct } from './../../core/Interfaces/IProduct';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../core/service/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { RelatedProductComponent } from "../related-product/related-product.component";
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { ToastrService } from 'ngx-toastr';
import { ActionLoadingComponent } from "../action-loading/action-loading.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RelatedProductComponent, StarRatingComponent, ActionLoadingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  _ProductService = inject(ProductService);
  _ActivatedRoute = inject(ActivatedRoute);
  _CartService = inject(CartService);
  _FavariteService = inject(FavariteService);
  _ToastrService = inject(ToastrService);



  id: string | null = ''
  product!: IProduct;
  isLoading: boolean = false;
  placeholderLoading = true;
  // get product details

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this._ProductService.getProductDetails(p.get('id')).subscribe({
          next: (res) => {
            this.product = res?.data;
            setTimeout(() => {
              this.placeholderLoading = false;
            }, 2000);
          },
          error: (err) => {
            this._ToastrService.error(err?.error?.message);
          },
        })
      }
    })
    

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
