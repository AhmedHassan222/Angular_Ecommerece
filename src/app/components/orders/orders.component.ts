import { jwtDecode } from 'jwt-decode';
import { OrderService } from './../../core/service/order.service';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { User } from '../../core/Interfaces/user';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Order } from '../../core/Interfaces/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _OrderService = inject(OrderService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  orders: WritableSignal<Order[]> = signal([]);


  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let user: User = jwtDecode(localStorage.getItem('token') as string);
      this._OrderService.getAllOrders(user.id).subscribe({
        next: (res) => {
          this.orders = res;
        },
        error: (err) => {
          this._ToastrService.error(err?.error?.message);
        }
      })
    }
  }

}
