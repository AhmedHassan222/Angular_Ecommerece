import { ProductService } from './../../core/service/product.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/Interfaces/IProduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { ToastrService } from 'ngx-toastr';
import { PlacholderLoadingComponent } from "../placholder-loading/placholder-loading.component";
import { MetaDataProduct } from '../../core/Interfaces/meta-data-product';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductGridComponent, FormsModule, SearchPipe, PlacholderLoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  // Dependancy Injection
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);
  _FavariteService = inject(FavariteService);
  _ToastrService = inject(ToastrService);
   _Subscription = new Subscription();

  // properties
  prodcuts: IProduct[] = [];
  searchword: string = '';
  arrayOfProductsIds: string[] = [];
  isLoading: boolean = false;
  placholderLoading: boolean = false;
  metaData!: MetaDataProduct;
  page: number = 1;
  numberOfPages: number = 1;

  // functons >>
  getAllProducts(pageNumber: number = 1) {
    this.placholderLoading = true;
    this._Subscription.add(this._ProductService.getAllProduct(pageNumber).subscribe({
      next: (res) => {
        this.prodcuts = res.data;
        this.metaData = res.metadata;
        this.page = this.metaData.currentPage;
        this.numberOfPages = this.metaData.numberOfPages;
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete:()=>{
          this.placholderLoading = false;
      }
    })) ;
  }


  ngOnInit(): void {
    this.getAllProducts(this.page);
  }

  
  onPageChange(page: number): void {
    this.getAllProducts(page)
    window.scroll(0,0)
  }

  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
