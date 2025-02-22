import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../core/service/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrderService = inject(OrderService)
  private readonly _ToastrService = inject(ToastrService);
  errorMessage: WritableSignal<string> = signal('');
  cartId: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  
  // form group
  orderForm: WritableSignal<FormGroup> = signal(new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]),
    city: new FormControl(null, [Validators.required])
  }));


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId.set(params.get('id') as string);
      }
    })
  }

  sendData(): void {
    this.isLoading.set(true);
    this._OrderService.checkout(this.orderForm().value, this.cartId()).subscribe({
      next: (res) => {
        if (res.status === "success") {
          window.open(res.session.url, "_self")
        }
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }
}
