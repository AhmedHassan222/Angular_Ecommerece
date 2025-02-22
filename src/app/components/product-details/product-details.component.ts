import { IProduct } from '../../core/models/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../core/service/product.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RelatedProductComponent } from "../related-product/related-product.component";
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RelatedProductComponent, StarRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _FavariteService = inject(FavariteService);
  private readonly _ToastrService = inject(ToastrService);
  id: WritableSignal<string | null> = signal(null);
  product: WritableSignal<IProduct> = signal({} as IProduct);
  isLoadingFavarite: WritableSignal<boolean> = signal(false);
  isLoadingCart: WritableSignal<boolean> = signal(false);
  placeholderLoading: WritableSignal<boolean> = signal(true);


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.id.set(p.get('id'));
        this._ProductService.getProductDetails(p.get('id')).subscribe({
          next: (res) => {
            this.product.set(res?.data)
          },
          complete: () => {
            setTimeout(() => {
              this.placeholderLoading.set(false);
            }, 1000);
          }
        })
      }
    })


  }
  addToCart(id: string): void {
    this.isLoadingCart.set(true);
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoadingCart.set(false)
    }, 2000);
  }

  addToFavarite(id: string): void {
    this.isLoadingFavarite.set(true);
    this._FavariteService.addToFavarite(id);
    setTimeout(() => {
      this.isLoadingFavarite.set(false)
    }, 2000);
  }
}
