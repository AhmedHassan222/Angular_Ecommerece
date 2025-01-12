import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _HttpClient = inject(HttpClient)


  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      },
      {
        headers: { token: localStorage.getItem('token') || '' }
      }
    )
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
