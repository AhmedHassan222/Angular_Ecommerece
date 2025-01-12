import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavariteService {
  _HttpClient = inject(HttpClient)


  addToFavarite(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      },
      {
        headers: { token: localStorage.getItem('token') || '' }
      }
    )
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