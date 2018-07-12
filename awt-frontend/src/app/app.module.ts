import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './views/login/login.component';
import {MainComponent} from './views/main/main.component';
import {SignupComponent} from './views/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./http-interceptors";
import {AuthService} from "./services/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {CreateCampaignComponent} from './views/main/create-campaign/create-campaign.component';
import {EditUserComponent} from './views/main/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    CreateCampaignComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
