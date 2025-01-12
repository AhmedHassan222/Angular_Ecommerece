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
  itemsInCart: number = 0;
  itemsInFavarite: number = 0;
  openMenu(): void {
    this.menu = !this.menu;
  }
  signOut(): void {
    this._AuthService.logOut();
  }
  ngOnInit(): void {
    this._CartService.getAllPrductsCart().subscribe({
      next: (res) => {
        this.itemsInCart = res.data.products.length;
      },
      error: () => {
        this.itemsInCart = 0;
      }
    })
    this._FavariteService.getAllPrductsFavarites().subscribe({
      next: (res) => {
        this.itemsInFavarite = res.data.length;
      },
      error: () => {
        this.itemsInFavarite = 0;
      }
    })
  }
}
