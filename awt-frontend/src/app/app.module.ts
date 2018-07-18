import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './views/login/login.component';
import {SignupComponent} from './views/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./http-interceptors";
import {AuthService} from "./services/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {MainModule} from "./main/main.module";
import {CampaignService} from "./services/campaign/campaign.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    CampaignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
