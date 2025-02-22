import { ProductService } from './../../core/service/product.service';
import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { PlacholderLoadingComponent } from "../placholder-loading/placholder-loading.component";
import { MetaDataProduct } from '../../core/models/meta-data-product';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { IProduct } from '../../core/models/iproduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductGridComponent, FormsModule, SearchPipe, PlacholderLoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  // Dependancy Injection
  private readonly _ProductService = inject(ProductService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Subscription = new Subscription();

  // properties
  prodcuts: WritableSignal<IProduct[]> = signal([]);
  searchword: WritableSignal<string> = signal('');
  arrayOfProductsIds: WritableSignal<string[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  placholderLoading: WritableSignal<boolean> = signal(false);
  metaData: WritableSignal<MetaDataProduct> = signal({} as MetaDataProduct);
  page: WritableSignal<number> = signal(1);
  numberOfPages: WritableSignal<number> = signal(1);

  // functons >>
  getAllProducts(pageNumber: number = 1) {
    this.placholderLoading.set(true);
    this._Subscription.add(this._ProductService.getAllProduct(pageNumber).subscribe({
      next: (res) => {
        this.prodcuts.set(res.data);
        this.metaData.set(res.metadata);
        this.page.set(this.metaData().currentPage);
        this.numberOfPages.set(this.metaData().numberOfPages);
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete: () => {
        this.placholderLoading.set(false);
      }
    }));
  }


  ngOnInit(): void {
    this.getAllProducts(this.page());
  }


  onPageChange(page: number): void {
    this.getAllProducts(page)
    window.scroll(0, 0)
  }

  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
