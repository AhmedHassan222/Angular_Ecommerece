import { jwtDecode } from 'jwt-decode';
import { OrderService } from './../../core/service/order.service';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../core/Interfaces/user';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../core/Interfaces/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe , CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  _OrderService = inject(OrderService)
  _ToastrService = inject(ToastrService)
  orders:Order[] = [];
  ngOnInit(): void {
    let user:User = jwtDecode(localStorage.getItem('token') as string);
    this._OrderService.getAllOrders(user.id).subscribe({
      next:(res)=>{
        this.orders = res;
      },
      error:(err)=>{
        this._ToastrService.error(err?.error?.message);
      }
    })
  }
  
}
