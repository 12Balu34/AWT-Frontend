import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {backendBaseUrl} from "../../app-constants/backend-url";
import {Peak} from "../../model/Peak";

@Injectable({
  providedIn: 'root'
})
export class PeakService {

  constructor(private http: HttpClient) { }

  public uploadPeakFile(campaignId: string, input, isToAnnotate: boolean) {
    let annotate: string;
    if(isToAnnotate) {
      annotate = '?annotate=true';
    }
    if(!isToAnnotate) {
      annotate='?annotate=false';
    }
    return this.http.post(backendBaseUrl + '/campaigns/'+ campaignId +'/peaks' + annotate, input);
  }

  public getAllPeaks(campaignId: string) {
    return this.http.get<Peak[]>(backendBaseUrl + '/campaigns/'+ campaignId +'/peaks');
  }
}
