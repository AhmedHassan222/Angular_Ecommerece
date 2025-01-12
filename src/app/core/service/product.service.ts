import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _HttpClient = inject(HttpClient);
  getAllProduct(pageNumber:number = 1): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${pageNumber}`);
  }
  getProductDetails(id: (string | null)): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
  getProductsRelated():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`); 
  }

}
