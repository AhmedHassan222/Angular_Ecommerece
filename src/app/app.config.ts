import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "top" })),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor,errorInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
  ]
};
