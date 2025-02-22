import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // using signal 
  numberOfItemsInCart: WritableSignal<number> = signal<number>(0);
  //end

  // // start here 
  // private cartCount = new BehaviorSubject<number>(0);
  // cartCount$ = this.cartCount.asObservable();


  // updateCartCount(count: number): void {
  //   this.cartCount.next(count);
  // }


  // end here

  _HttpClient = inject(HttpClient)
  toastr = inject(ToastrService)

  addToCart(productId: string): void {
    this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, { productId }, {
      headers: {
        token: localStorage.getItem('token') || ""
      }
    }).subscribe({
      next: (res: any) => {
        // this.updateCartCount(res?.data?.products?.length);
        this.numberOfItemsInCart.set(res?.data?.products?.length);
        this.toastr.success('The product is added to cart');
      },
      error: (err) => {
        console.log(err)
        console.log(productId)
        this.toastr.error(err?.error?.message);
      },
    });
  }

  updateQuantity(id: string, count: number): Observable<any> {
    console.log(typeof count)
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      "count": count
    },
      {
        headers: {
          token: (localStorage.getItem('token') || '')
        }
      }
    )
  }

  getAllPrductsCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers: {
          token: (localStorage.getItem('token') || '')
        }
      }
    )
  }
  deleteProductFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: { token: (localStorage.getItem('token') || '') }
    })
  }

  ClearAllProductsFromCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: (localStorage.getItem('token') || '')
      }
    })
  }

}
