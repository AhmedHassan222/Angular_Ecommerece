import { IProduct } from '../../core/Interfaces/IProduct';
import { ProductService } from './../../core/service/product.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FavariteService } from '../../core/service/favarite.service';
import { PlacholderLoadingComponent } from '../placholder-loading/placholder-loading.component';
import { ActionLoadingComponent } from "../action-loading/action-loading.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-related-product',
  standalone: true,
  imports: [ PlacholderLoadingComponent, ActionLoadingComponent , RouterLink],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss'
})
export class RelatedProductComponent implements OnInit {
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);
  _FavariteService = inject(FavariteService);
  _ToastrService = inject(ToastrService);


  products: IProduct[] = [];
  relatedProducts: IProduct[] = [];
  isLoading:boolean = false;
  placholderLoading:boolean = true;
  @Input() category!: string;
  @Input() brand!: string;
  getRelatedProducts(categoryName: string, brandName: string): void {
    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.placholderLoading = false;
        }, 2000);
        this.products = res?.data;
        this.relatedProducts = this.products.filter(p => p.category.name === categoryName && p.brand.name === brandName);
      },
      error: (err) => { 
        this._ToastrService.error(err?.error?.message);
      }
    })
  }

  ngOnInit(): void {

    this.getRelatedProducts(this.category, this.brand)
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
