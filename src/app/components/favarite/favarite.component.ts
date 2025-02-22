import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FavariteService } from '../../core/service/favarite.service';
import { CartService } from '../../core/service/cart.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/models/iproduct';
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
export class FavariteComponent implements OnInit {
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
    this._FavariteService.getAllPrductsFavarites().subscribe({
      next: (res) => {
        this.prodcuts.set(res?.data);
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

  addToCart(id: string): void {
    this.isLoadingCart.set(true);
    this._CartService.addToCart(id);
    setTimeout(() => {
      this.isLoadingCart.set(false);
    }, 2000);
  }



}
