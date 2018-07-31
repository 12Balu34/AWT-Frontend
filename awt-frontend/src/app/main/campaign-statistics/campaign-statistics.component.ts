import {Component, OnInit} from '@angular/core';
import {CampaignStatistics} from "../../model/CampaignStatistics";
import {TSMap} from "typescript-map";
import {Annotation} from "../../model/Annotation";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../services/campaign/campaign.service";
import {Observable} from "rxjs/internal/Observable";
import {AnnotationService} from "../../services/annotation/annotation.service";

@Component({
  selector: 'app-campaign-statistics',
  templateUrl: './campaign-statistics.component.html',
  styleUrls: ['./campaign-statistics.component.css']
})
export class CampaignStatisticsComponent implements OnInit {
  campaignId: number;
  campaignStatistics: CampaignStatistics;
  campaignStatisticsObservable: Observable<CampaignStatistics>;

  selectedPeakAnnotations: Annotation[];
  selectedPeakWithRejectedAnnotations: Annotation[];
  annotatedPeaksMap: TSMap<number, Annotation[]> = new TSMap<number, Annotation[]>();
  annotatedPeaksWithRejectedAnnotationsMap: TSMap<number, Annotation[]> = new TSMap<number, Annotation[]>();

  message: string;
  messageClass: string;

  constructor(private activatedRoute: ActivatedRoute, private campaignService: CampaignService, private annotationService: AnnotationService) {
  }

  ngOnInit() {
    this.getCampaignStatisticsObservable();
    this.subscribeToCampaignStatisticsObservable();
  }

  private getCampaignStatisticsObservable() {
    this.activatedRoute.paramMap.subscribe(
      data => {
        this.campaignId = +data.get('id');
        this.campaignStatisticsObservable = this.campaignService.getCampaignStatistics(this.campaignId);
      }
    )
  }

  private subscribeToCampaignStatisticsObservable() {
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

  displayAnnotations(peakId: number) {
    //Look if peak is already in Map
    if (this.annotatedPeaksMap.has(peakId)) {
      this.selectedPeakAnnotations = this.annotatedPeaksMap.get(peakId);
      return;
    }
    //if it was not in the Map, then get the peak and save it in the Map

    this.getAllAnnotationsForPeak(peakId)
      .subscribe(
        data => {
          console.log(data);
          this.selectedPeakAnnotations = data;
          this.annotatedPeaksMap.set(peakId, data);
        },
        error => {
          console.log(error);
        }
      )

  }

  displayRejectedAnnotations(peakId: number) {
    //Look if peak is already in Map
    this.selectedPeakWithRejectedAnnotations = this.annotatedPeaksWithRejectedAnnotationsMap.get(peakId);

    //if it was not in the Map, then get the peak and save it in the Map
    if (this.selectedPeakWithRejectedAnnotations == null) {
      this.getRejectedAnnotationsForPeak(peakId)
        .subscribe(
          data => {
            this.selectedPeakWithRejectedAnnotations = data;
            this.annotatedPeaksWithRejectedAnnotationsMap.set(peakId, data)
          }
          ,
          error => {
            console.log(error);
          }
        )
    }
  }

  getAllAnnotationsForPeak(peakId: number): Observable<Annotation[]> {
    return this.annotationService.getAllAnnotationsForPeak(this.campaignId, peakId);
  }

  private getRejectedAnnotationsForPeak(peakId: number) {
    return this.annotationService.getRejectedAnnotationsForPeak(this.campaignId, peakId);

  }
}
