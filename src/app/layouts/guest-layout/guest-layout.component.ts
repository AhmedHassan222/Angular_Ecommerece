import { Component } from '@angular/core';
import { GuestNavbarComponent } from '../../components/guest-navbar/guest-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports: [GuestNavbarComponent,RouterOutlet,FooterComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss'
})
export class GuestLayoutComponent {

}
