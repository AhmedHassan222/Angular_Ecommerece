import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FavariteComponent } from './components/favarite/favarite.component';
import { authGuard } from './core/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '', component: GuestLayoutComponent, canActivate: [authGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      { path: 'register', component: RegisterComponent, title: 'Register Page' },
      { path: 'forget-password', component: ForgetPasswordComponent, title: 'Forget Password Page' }
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [guestGuard], children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent, title: 'Products Page' },
      { path: 'cart', component: CartComponent, title: 'Shopping Cart Page' },
      { path: 'allorders', component: OrdersComponent, title: 'My Orders Page' },
      { path: 'edit-profile', component: EditProfileComponent, title: 'Edit Profile Page' },
      { path: 'profile', component: ProfileComponent, title: 'Profile Page' },
      { path: 'change-password', component: ChangePasswordComponent, title: 'Change Password Page' },
      { path: 'favarite', component: FavariteComponent, title: 'Wishlist Page' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout Page' },
      { path: 'products/:id', component: ProductDetailsComponent, title: "Product's Detilas Page" },
      { path: '**', component: NotfoundComponent, title: 'Not Found Page' },
    ]
  },
];
