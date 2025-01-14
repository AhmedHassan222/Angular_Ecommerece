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
  isLoadingFavarite: boolean = false;
  isLoadingCart: boolean = false;
  placeholderLoading = true;
  // get product details
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this._ProductService.getProductDetails(p.get('id')).subscribe({
          next: (res) => {
            this.product = res?.data;
          },
          error: (err) => {
            this._ToastrService.error(err?.error?.message);
          },
          complete:()=>{
            setTimeout(() => {
              this.placeholderLoading = false;
            }, 1000);
          }
        })
      }
    })


  }
  addToCart(id: string): void {
    this.isLoadingCart = true;
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoadingCart = false;
    }, 2000);
  }

  addToFavarite(id: string): void {
    this.isLoadingFavarite = true;
    this._FavariteService.addToFavarite(id);
    setTimeout(() => {
      this.isLoadingFavarite = false;
    }, 2000);
  }
}
