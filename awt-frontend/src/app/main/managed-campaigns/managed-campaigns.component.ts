import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign/campaign.service";
import {Campaign} from "../../model/campaign";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-managed-campaigns',
  templateUrl: './managed-campaigns.component.html',
  styleUrls: ['./managed-campaigns.component.css']
})
export class ManagedCampaignsComponent implements OnInit {
  isManager: boolean;
  campaigns: Campaign[];

  constructor(private campaignService: CampaignService, private authService: AuthService) {
  }

  ngOnInit() {
    setTimeout(()=>this.initializeComponent(), 150)

  }

  private getAllCampaigns() {
    this.campaignService.getAllCampaigns()
      .subscribe(
        data => {
          this.campaigns = data;
        }
      )
  }

  private initializeComponent() {
    this.getAllCampaigns();
    this.isManager = this.authService.isManager();
  }
}
