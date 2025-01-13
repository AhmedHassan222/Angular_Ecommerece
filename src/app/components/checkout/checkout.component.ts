import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
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
  _ActivatedRoute = inject(ActivatedRoute)
  _OrderService = inject(OrderService)
  errorMessage: string = '';
  cartId: string  = '';
  isLoading: boolean = false;
  orderForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]),
    city: new FormControl(null, [Validators.required])
  })
   _ToastrService = inject(ToastrService);
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId =  params.get('id') as string;
      }
    })
  }
  sendData(): void {
    this.isLoading = true;
    this._OrderService.checkout(this.orderForm.value , this.cartId).subscribe({
      next:(res)=>{
        this.isLoading = false;
        if(res.status === "success")
        {
          window.open(res.session.url , "_self")
        }
      },
      error:(err)=>{
        this.isLoading = false;
        this._ToastrService.error(err?.error?.message);

      }
    })
  }
}
