import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign/campaign.service";
import {CreateCampaignRequest} from "../../model/create-campaign-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  createCampaignForm: FormGroup;
  message: string;
  messageClass: string;

  constructor(private formBuilder: FormBuilder, private campaignService: CampaignService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }


  private createForm() {
    this.createCampaignForm = this.formBuilder.group({
        name: ['', Validators.required]
      }
    );
  }

  private createCampaign() {
    const request: CreateCampaignRequest = {
      name: this.createCampaignForm.get('name').value
    };

    this.campaignService.createCampaign(request)
      .subscribe(
        data=> {
          this.message = 'Campaign created successfully';
          this.messageClass = 'alert alert-success';
          setTimeout(()=>this.router.navigateByUrl('/campaigns'),1500);
        },
        error => {
          console.log(JSON.stringify(error))
          this.message = error.error.message;
          this.messageClass = 'alert alert-danger'
        }
      )

  }
}
