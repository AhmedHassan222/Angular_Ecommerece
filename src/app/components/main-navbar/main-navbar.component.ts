import { AuthService } from './../../core/service/auth.service';
import { Component, inject, OnInit } from '@angular/core';
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
  _AuthService = inject(AuthService)
  _CartService = inject(CartService)
  _FavariteService = inject(FavariteService)
  menu: boolean = false;
  openMenu(): void {
    this.menu = !this.menu;
  }
  isLogin:boolean = false;
  cartCount: number = 0;
  favariteCount: number = 0;


   private setupUserDataListener(): void {
    this._AuthService.userData.subscribe({
      next: (userData) => {
        this.isLogin = !!userData;
      },
    });
  }

  ngOnInit(): void {
    this.setupUserDataListener();
    this.getCountFavAndCart();
    this._CartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
    this._FavariteService.favariteCount$.subscribe((count) => {
      this.favariteCount = count;
    });
  }
  getCountFavAndCart() {
    this._CartService.getAllPrductsCart().subscribe({
      next: (res) => {
        this.cartCount = res.data.products.length;
      },
      error: () => {
        this.cartCount = 0;
      }
    })
    this._FavariteService.getAllPrductsFavarites().subscribe({
      next: (res) => {
        this.favariteCount = res.data.length;
      },
      error: () => {
        this.favariteCount = 0;
      }
    })
  }
}
