import { IProduct } from '../../core/models/iproduct';
import { ProductService } from './../../core/service/product.service';
import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { PlacholderLoadingComponent } from '../placholder-loading/placholder-loading.component';
import { ProductGridComponent } from "../product-grid/product-grid.component";

@Component({
  selector: 'app-related-product',
  standalone: true,
  imports: [PlacholderLoadingComponent, ProductGridComponent],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss'
})
export class RelatedProductComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _FavariteService = inject(FavariteService);
  products: WritableSignal<IProduct[]> = signal([]);
  relatedProducts: WritableSignal<IProduct[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  placholderLoading: WritableSignal<boolean> = signal(true);
  category: InputSignal<string> = input('')
  brand: InputSignal<string> = input('')

  getRelatedProducts(categoryName: string, brandName: string): void {
    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.products.set(res?.data);
        this.relatedProducts.set(this.products().filter(p => p.category.name === categoryName && p.brand.name === brandName));
      },
      complete: () => {
        setTimeout(() => {
          this.placholderLoading.set(false);
        }, 2000);
      }
    })
  }

  ngOnInit(): void {

    this.getRelatedProducts(this.category(), this.brand());
  }

  addToCart(id: string): void {
    this.isLoading.set(true);
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }


  addToFavarite(id: string): void {
    this.isLoading.set(true);
    this._FavariteService.addToFavarite(id);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

}
