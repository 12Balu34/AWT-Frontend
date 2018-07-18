import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {backendBaseUrl} from "../../app-constants/backend-url";
import {CreateCampaignRequest} from "../../model/create-campaign-request";
import {throwError} from "rxjs/internal/observable/throwError";
import {Campaign} from "../../model/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  public createCampaign(request: CreateCampaignRequest) {
    return this.http.post(backendBaseUrl + '/campaigns',request)
  }

  public getAllCampaigns(){
    return this.http.get<Campaign[]>(backendBaseUrl + '/campaigns')

  }

  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log(JSON.stringify(error));
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message);
  }
}
