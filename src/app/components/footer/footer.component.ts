import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  year: Number = new Date().getFullYear();
  socialMediaIcons = [
    { icon: 'fa-brands mx-2 fs-5 fa-facebook' },
    { icon: 'fa-brands mx-2 fs-5 fa-instagram' },
    { icon: 'fa-brands mx-2 fs-5 fa-linkedin' },
    { icon: 'fa-brands mx-2 fs-5 fa-tiktok' },
    { icon: 'fa-brands mx-2 fs-5 fa-twitter' },
  ];
}