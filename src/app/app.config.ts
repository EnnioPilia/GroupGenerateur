import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';


export const appConfig:ApplicationConfig  = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), 
    [provideZoneChangeDetection({ eventCoalescing: true }),
       provideRouter(routes),
        provideHttpClient()]
  ]
};

