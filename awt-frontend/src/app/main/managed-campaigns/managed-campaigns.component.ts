import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign/campaign.service";
import {Campaign} from "../../model/campaign";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-managed-campaigns',
  templateUrl: './managed-campaigns.component.html',
  styleUrls: ['./managed-campaigns.component.css']
})
export class ManagedCampaignsComponent implements OnInit {
  isManager: boolean;
  campaigns: Campaign[];
  enrolledCampaigns: Campaign[];
  enrollMessage: string;
  enrollMessageClass: string;

  constructor(private campaignService: CampaignService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    setTimeout(()=>this.initializeComponent(), 150)
  }

  private initializeComponent() {
    this.getAllCampaigns();
    this.isManager = this.authService.isManager();
    if(!this.isManager) {
      this.getEnrolledCampaigns();
    }
  }

  private getAllCampaigns() {
    this.campaignService.getAllCampaigns()
      .subscribe(
        data => {
          this.campaigns = data;
          console.log(this.campaigns);
        }
      )
  }

  private getEnrolledCampaigns() {
    this.campaignService.getEnrolledCampaigns()
      .subscribe(
        data => {
          this.enrolledCampaigns = data;
          console.log(this.enrolledCampaigns);
        }
      )
  }

  private enrolInCampaign(campaignId: number) {
    this.campaignService.enrollInCampaign(campaignId)
      .subscribe(
        data => {
          this.enrollMessage = data.message;
          this.enrollMessageClass = 'alert alert-success';
          setTimeout(()=>{
            this.router.navigateByUrl('/campaigns/'+ campaignId +'/map')
            }, 1000)
        },
        error => {
          this.enrollMessage = error.error.message;
          this.enrollMessageClass = 'alert alert-danger';
        }
      );
  }
}
