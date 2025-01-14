import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FavariteComponent } from './components/favarite/favarite.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  { path: 'login', component: LoginComponent,canActivate:[authGuard],  title: 'Login Page' },
  { path: 'register', component: RegisterComponent,canActivate:[authGuard],  title: 'Register Page' },
  { path: 'forget-password', component: ForgetPasswordComponent,canActivate:[authGuard],  title: 'Forget Password Page' },
  { path: 'products', component: ProductsComponent, title: 'Products Page' },
  { path: 'cart', component: CartComponent,canActivate:[guestGuard],  title: 'Shopping Cart Page' },
  { path: 'allorders', component: OrdersComponent,canActivate:[guestGuard],  title: 'My Orders Page' },
  { path: 'edit-profile', component: EditProfileComponent,canActivate:[guestGuard],  title: 'Edit Profile Page' },
  { path: 'profile', component: ProfileComponent,canActivate:[guestGuard],  title: 'Profile Page' },
  { path: 'change-password', component: ChangePasswordComponent,canActivate:[guestGuard],  title: 'Change Password Page' },
  { path: 'favarite', component: FavariteComponent, canActivate:[guestGuard], title: 'Wishlist Page' },
  { path: 'checkout/:id', component: CheckoutComponent,canActivate:[guestGuard],  title: 'Checkout Page' },
  { path: 'products/:id', component: ProductDetailsComponent, title: "Product's Detilas Page" },
  { path: '**', component: NotfoundComponent, title: 'Not Found Page' }
];
