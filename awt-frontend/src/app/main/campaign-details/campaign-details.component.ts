import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CampaignService} from "../../services/campaign/campaign.service";
import {Campaign} from "../../model/campaign";
import {Observable} from "rxjs/internal/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PeakService} from "../../services/peak/peak.service";
import {MessageTimeout} from "../../app-constants/messageTimeout";

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {
  campaignObservable: Observable<Campaign>;
  campaign: Campaign;

  uploadPeaksForm: FormGroup;
  private peakFile: File;

  message: string;
  messageClass: string;
  uploadMessage: string;
  uploadMessageClass: string;
  statusUpdateMessage: string;
  statusUpdateMessageClass: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private peakService: PeakService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getCurrentCampaign();
    this.subscribeToCampaignObservable();
    this.createForm();
  }

  private getCurrentCampaign() {
    this.activatedRoute.paramMap.subscribe(
      data => {
        this.campaignObservable = this.campaignService.getSingleCampaign(data.get('id'));
      }
    )
  }

  private subscribeToCampaignObservable() {
    this.campaignObservable.subscribe(
      data => this.campaign = data,
      error => {
        this.message = error;
        this.messageClass = 'alert alert-danger';
      }
    )
  }

  private createForm() {
    this.uploadPeaksForm = this.formBuilder.group({
      peakFile: ['', Validators.required],
      isToBeAnnotated: [false, Validators.required]
    });
  }


  handleFileInput(files: FileList) {
    this.peakFile = files.item(0);
  }

  uploadDocument() {
    let isToAnnotate: boolean = this.uploadPeaksForm.get('isToBeAnnotated').value;
    let fileReader = new FileReader();
    fileReader.readAsText(this.peakFile);
    fileReader.onload = () => {
      this.handleUpload(this.peakService.uploadPeakFile(
        this.campaign.id.toString(), fileReader.result, isToAnnotate
      ))
    }
  }

  private handleUpload(response: Observable<any>) {
    response.subscribe(
      data => {
        this.uploadMessage = data.message;
        this.uploadMessageClass = 'alert alert-success';
        setTimeout(
          () => {
            this.router.navigateByUrl('/campaigns/' + this.campaign.id.toString() + '/map')
          },
          1000
        )
      },
      error => {
        this.uploadMessage = error.error.message;
        this.uploadMessageClass = 'alert alert-danger';
      }
    )
  }

  private startCampaign() {
    this.campaignService.updateCampaignStatus(this.campaign.id)
      .subscribe(
        data => {
          this.statusUpdateMessage = "Status updated to Started";
          this.statusUpdateMessageClass = 'alert alert-success alert-dismissible';
          this.resetMessagesWithTimeout(MessageTimeout);
          this.campaign.campaignStatus = 'STARTED';
          this.campaign.startDate = Date.now().toString();
        },
        error => {
          console.log(error);
          this.statusUpdateMessage = error.error.message;
          this.statusUpdateMessageClass = 'alert alert-danger alert-dismissible';
        }
      );
  }

  private closeCampaign() {
    this.campaignService.updateCampaignStatus(this.campaign.id)
      .subscribe(
        data => {
          this.statusUpdateMessage = "Status updated to Closed";
          this.statusUpdateMessageClass = 'alert alert-success alert-dismissible';
          this.campaign.campaignStatus = 'CLOSED';
          this.resetMessagesWithTimeout(MessageTimeout);
        },
        error => {
          console.log(error);
          this.statusUpdateMessage = error.error.message;
          this.statusUpdateMessageClass = 'alert alert-danger alert-dismissible';
        }
      );
  }

  private resetMessages() {
    this.message = null;
    this.uploadMessage = null;
    this.statusUpdateMessage = null;
  }

  private resetMessagesWithTimeout(timeout: number) {
    setTimeout(() => this.resetMessages(), timeout)
  }
}
