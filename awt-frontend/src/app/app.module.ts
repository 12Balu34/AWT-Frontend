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
import {AngularCesiumModule} from 'angular-cesium';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainModule,
    AngularCesiumModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    CampaignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
