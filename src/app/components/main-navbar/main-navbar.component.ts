import { AuthService } from './../../core/service/auth.service';
import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/service/cart.service';
import { FavariteService } from '../../core/service/favarite.service';





@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss'
})
export class MainNavbarComponent implements OnInit {
  private readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)
  private readonly _FavariteService = inject(FavariteService)
  menu: WritableSignal<boolean> = signal(false);
  isLogin: WritableSignal<boolean> = signal(false);
  cartCount: Signal<number> = computed(() => this._CartService.numberOfItemsInCart());
  favariteCount: Signal<number> = computed(() => this._FavariteService.numberOfItemsFavarite());

  openMenu(): void {
    this.menu.update(val => !val);
  }

  private setupUserDataListener(): void {
    this._AuthService.userData.subscribe({
      next: (userData) => {
        this.isLogin.set(!!userData);
      },
    });
  }

  ngOnInit(): void {
    this.setupUserDataListener();
    this.getCountFavAndCart();
  }
  getCountFavAndCart() {
    this._CartService.getAllPrductsCart().subscribe({
      next: (res) => {
        this._CartService.numberOfItemsInCart.set(res.data.products.length);
      },
      error: () => {
        this._CartService.numberOfItemsInCart.set(0);
      }
    })
    this._FavariteService.getAllPrductsFavarites().subscribe({
      next: (res) => {
        this._FavariteService.numberOfItemsFavarite.set(res.data.length);
      },
      error: () => {
        this._FavariteService.numberOfItemsFavarite.set(0);
      }
    })
  }
}
