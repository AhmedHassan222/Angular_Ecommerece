import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FavariteService {
  private readonly _HttpClient = inject(HttpClient)
  private readonly _ToastrService = inject(ToastrService)
  numberOfItemsFavarite: WritableSignal<number> = signal(0);


  addToFavarite(id: string): void {
    this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }).subscribe({
        next: (res: any) => {
          this.numberOfItemsFavarite.set(res?.data?.length)
          this._ToastrService.success('The product is added to wishlist');
        },
        error: (err) => {
          this._ToastrService.error(err?.error?.message);
        }
      })
  }

  getAllPrductsFavarites(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
  deleteProductFromFavarite(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }
}