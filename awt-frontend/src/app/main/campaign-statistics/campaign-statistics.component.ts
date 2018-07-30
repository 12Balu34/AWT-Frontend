import {Component, OnInit} from '@angular/core';
import {CampaignStatistics} from "../../model/CampaignStatistics";
import {TSMap} from "typescript-map";
import {Annotation} from "../../model/Annotation";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../services/campaign/campaign.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-campaign-statistics',
  templateUrl: './campaign-statistics.component.html',
  styleUrls: ['./campaign-statistics.component.css']
})
export class CampaignStatisticsComponent implements OnInit {
  campaignId: number;
  campaignStatistics: CampaignStatistics;
  campaignStatisticsObservable: Observable<CampaignStatistics>;
  annotatedPeaks: TSMap<number, Annotation> = new TSMap<number, Annotation>();
  annotatedPeaksWithRejectedAnnotations: TSMap<number, Annotation> = new TSMap<number, Annotation>();

  message: string;
  messageClass: string;

  constructor(private activatedRoute: ActivatedRoute, private campaignService: CampaignService) {
  }

  ngOnInit() {
    this.getCampaignStatisticsObservable();
    this.subscribeToCampaigStatisticsObservable();
  }

  private getCampaignStatisticsObservable() {
    this.activatedRoute.paramMap.subscribe(
      data => {
        this.campaignId = +data.get('id');
        this.campaignStatisticsObservable = this.campaignService.getCampaignStatistics(this.campaignId);
      }
    )
  }

  private subscribeToCampaigStatisticsObservable() {
    this.campaignStatisticsObservable
      .subscribe(
        data => {
          this.campaignStatistics = data;
        },
        error => {
          this.message = error;
          this.messageClass = 'alert alert-danger';
        }
      )
  }
}
