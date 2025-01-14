import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProduct } from '../../core/Interfaces/IProduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss'
})
export class ProductGridComponent {
  @Input() product!: IProduct;
  @Input() styleImage!: string;
  @Input() inFavarite: boolean = false;
  @Output() productRemoved = new EventEmitter<void>(); // Emit event to notify parent

  _CartService = inject(CartService);
  _FavariteService = inject(FavariteService);
  isLoadingFavarite: boolean = false;
  isLoadingCart: boolean = false;

  _ToastrService= inject(ToastrService);

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

  removeFromFavarite(id: string) {
    this.isLoadingFavarite = true;
    this._FavariteService.deleteProductFromFavarite(id).subscribe({
      next: (res) => {
        //start here 
        this._FavariteService.updatefavariteCount(res?.data?.length);
        // end here       
        this._ToastrService.error('The product is removed from wishlist');
        this.productRemoved.emit();
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete:()=>{
        this.isLoadingFavarite = false;
      }
    })
  }

}
