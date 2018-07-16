import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from "./main.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CreateCampaignComponent} from "./create-campaign/create-campaign.component";
import {AppRoutingModule} from "../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MainComponent,
    EditUserComponent,
    CreateCampaignComponent
  ]
})
export class MainModule { }
