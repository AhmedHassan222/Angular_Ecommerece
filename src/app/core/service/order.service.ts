import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  _HttpClient = inject(HttpClient);
  checkout(model: object, idCart: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.frontUrl}`, {
      shippingAddress: model
    }, {
      headers: {
        token: (localStorage.getItem("token") || '')
      }
    })
  }
  getAllOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`)
  }
}
