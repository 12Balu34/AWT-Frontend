import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/login.component";
import {MainComponent} from "./main/main.component";
import {SignupComponent} from "./views/signup/signup.component";
import {AuthGuardService} from "./services/authguard/auth-guard.service";
import {EditUserComponent} from "./main/edit-user/edit-user.component";
import {CreateCampaignComponent} from "./main/create-campaign/create-campaign.component";
import {ManagedCampaignsComponent} from "./main/managed-campaigns/managed-campaigns.component";
import {ManagerAuthguardService} from "./services/manager-authguard/manager-authguard.service";
import {CampaignDetailsComponent} from "./main/campaign-details/campaign-details.component";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: '', component: MainComponent,  canActivate: [AuthGuardService],
    children: [
      { path: 'profile', component: EditUserComponent,  canActivate: [AuthGuardService]},
      { path: 'create-campaign', component: CreateCampaignComponent,  canActivate: [AuthGuardService, ManagerAuthguardService]},
      { path: 'campaigns', component: ManagedCampaignsComponent,  canActivate: [AuthGuardService]},
      { path: 'campaigns/:id', component: CampaignDetailsComponent,  canActivate: [AuthGuardService, ManagerAuthguardService]},
    ] },
  { path: '',   redirectTo: '/campaigns', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
