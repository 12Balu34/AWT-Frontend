import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from "./main.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CreateCampaignComponent} from "./create-campaign/create-campaign.component";
import {AppRoutingModule} from "../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ManagedCampaignsComponent} from './managed-campaigns/managed-campaigns.component';
import {DataTablesModule} from "angular-datatables";
import {ManagerSidebarComponent} from './manager-sidebar/manager-sidebar.component';
import {WorkerSidebarComponent} from './worker-sidebar/worker-sidebar.component';
import {CampaignDetailsComponent} from './campaign-details/campaign-details.component';
import {MapPageComponent} from './map-page/map-page.component';
import {CampaignStatisticsComponent} from './campaign-statistics/campaign-statistics.component';
import {LeafletModule} from "@asymmetrik/angular2-leaflet";
import {AngularCesiumModule} from 'angular-cesium';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    LeafletModule,
    AngularCesiumModule.forRoot()
  ],
  declarations: [
    MainComponent,
    EditUserComponent,
    CreateCampaignComponent,
    ManagedCampaignsComponent,
    ManagerSidebarComponent,
    WorkerSidebarComponent,
    CampaignDetailsComponent,
    MapPageComponent,
    CampaignStatisticsComponent
  ]
})
export class MainModule { }
