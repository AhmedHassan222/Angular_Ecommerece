import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FavariteService {

  // start here 
  private favariteCount = new BehaviorSubject<number>(0);
  favariteCount$ = this.favariteCount.asObservable();


  updatefavariteCount(count: number): void {
    this.favariteCount.next(count);
  }


  // end here
  _HttpClient = inject(HttpClient)
  _CartService = inject(CartService)
  _ToastrService = inject(ToastrService)


  addToFavarite(id: string): void {
    this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      },
      {
        headers: { token: localStorage.getItem('token') || '' }
      }
    ).subscribe({
      next: (res: any) => {
        // start here 
        this.updatefavariteCount(res?.data?.length)
        // end here
        this._ToastrService.success('The product is added to wishlist');
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      }
    })
  }

  getAllPrductsFavarites(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
      {
        headers: {
          token: (localStorage.getItem('token') || '')
        }
      }
    )
  }
  deleteProductFromFavarite(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`, {
      headers: { token: (localStorage.getItem('token') || '') }
    })
  }
}