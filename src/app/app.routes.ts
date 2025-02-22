import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    title: 'Home Page'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    canActivate: [authGuard],
    title: 'Login Page'
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
    canActivate: [authGuard],
    title: 'Register Page'
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
    canActivate: [authGuard],
    title: 'Forget Password Page'
  },
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
    title: 'Products Page'
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
    canActivate: [guestGuard],
    title: 'Shopping Cart Page'
  },
  {
    path: 'allorders',
    loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [guestGuard],
    title: 'My Orders Page'
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./components/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
    canActivate: [guestGuard],
    title: 'Edit Profile Page'
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [guestGuard],
    title: 'Profile Page'
  },
  {
    path: 'change-password',
    loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    canActivate: [guestGuard],
    title: 'Change Password Page'
  },
  {
    path: 'favarite',
    loadComponent: () => import('./components/favarite/favarite.component').then(m => m.FavariteComponent),
    canActivate: [guestGuard],
    title: 'Wishlist Page'
  },
  {
    path: 'checkout/:id',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [guestGuard],
    title: 'Checkout Page'
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent),
    title: "Product's Details Page"
  },
  {
    path: '**',
    loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'Not Found Page'
  }
];
