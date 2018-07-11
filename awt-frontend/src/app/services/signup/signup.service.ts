import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {backendBaseUrl} from "../../app-constants/backend-url";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {User} from "../../model/user";
import {ApiResponse} from "../../model/api-response";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  public signup(user: User) {
    return this.http.post<ApiResponse>(backendBaseUrl + '/auth/signup', user)
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
}
