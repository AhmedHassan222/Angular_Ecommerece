import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FavariteService } from '../../core/service/favarite.service';
import { CartService } from '../../core/service/cart.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/Interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';
import { PlacholderLoadingComponent } from "../placholder-loading/placholder-loading.component";
import { ProductGridComponent } from "../product-grid/product-grid.component";

@Component({
  selector: 'app-favarite',
  standalone: true,
  imports: [PlacholderLoadingComponent, ProductGridComponent],
  templateUrl: './favarite.component.html',
  styleUrl: './favarite.component.scss'
})
export class FavariteComponent implements OnInit, OnDestroy {
  private readonly _FavariteService = inject(FavariteService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  prodcuts: WritableSignal<IProduct[]> = signal([]);
  addToFavariteError: WritableSignal<string> = signal('');
  getAllProductSubscribe!: Subscription;
  isLoadingFavarite: WritableSignal<boolean> = signal(false);
  isLoadingCart: WritableSignal<boolean> = signal(false);
  placholderLoading: WritableSignal<boolean> = signal(true);

  // functons >>
  getAllProductsFavarite() {
    this.getAllProductSubscribe = this._FavariteService.getAllPrductsFavarites().subscribe({
      next: (res) => {
        this.prodcuts.set(res.data);
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete: () => {
        setTimeout(() => {
          this.placholderLoading.set(false);
        }, 2000);
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
    this.isLoadingCart.set(true);
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoadingCart.set(false);
    }, 2000);
  }



  removeFromFavarite(id: string) {
    this.isLoadingFavarite.set(true);
    this._FavariteService.deleteProductFromFavarite(id).subscribe({
      next: (res) => {
        this._FavariteService.numberOfItemsFavarite.set(res?.data?.length);
        this._ToastrService.error('The product is removed from wishlist');
        this.getAllProductsFavarite();
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete: () => {
        this.isLoadingFavarite.set(false);
      }
    })
  }
}
