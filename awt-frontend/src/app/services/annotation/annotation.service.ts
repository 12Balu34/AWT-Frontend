import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {backendBaseUrl} from "../../app-constants/backend-url";
import {Annotation, AnnotationBase} from "../../model/Annotation";
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError} from "rxjs/operators";
import {ApiResponse} from "../../model/api-response";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private http: HttpClient) { }

  createAnnotation(campaignId: number, peakId: number, annotation: AnnotationBase): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(backendBaseUrl + '/campaigns/' + campaignId + '/peaks/'+ peakId +'/annotations', annotation)
      .pipe(
        catchError(this.handleError)
      );
  }

  acceptAnnotation(campaignId: number, peakId: number, annotationId: number){
    return this.http.patch(backendBaseUrl + '/campaigns/' + campaignId + '/peaks/'+ peakId +'/annotations/'+ annotationId + '?accepted=true', null)
      .pipe(
        catchError(this.handleError)
      );
  }

  rejectAnnotation(campaignId: number, peakId: number, annotationId: number){
    return this.http.patch(backendBaseUrl + '/campaigns/' + campaignId + '/peaks/'+ peakId +'/annotations/'+ annotationId + '?accepted=false', null)
      .pipe(
        catchError(this.handleError)
      );
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

  getWorkerAnnotations(campaignId: number) {
    return this.http.get<Annotation[]>(backendBaseUrl + '/campaigns/' + campaignId +'/annotations')
      .pipe(
        catchError(this.handleError)
      );
  }
}
