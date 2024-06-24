import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideStore } from '@ngrx/store';
import { effects, reducers } from './store';
import { CartService } from './services/cart.service';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHotToastConfig(),
    provideStore(reducers),
    provideEffects(effects),
    CartService,
  ],
};
