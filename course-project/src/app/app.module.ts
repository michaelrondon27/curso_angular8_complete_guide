import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

// NGRX
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    SharedModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    StoreModule.forRoot(fromApp.appReducer)
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
