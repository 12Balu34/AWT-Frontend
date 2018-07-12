import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {backendBaseUrl} from "../../app-constants/backend-url";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {LoginResponse} from "../../model/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string;

  constructor(private http: HttpClient) { }


  public getAccessToken(): string {
    return this.accessToken;
  }

  public setAccessToken(value: string) {
    this.accessToken = value;
  }

  public login(userCredentials) {
    console.log('LoginService accessed ' + userCredentials.toString())
    return this.http.post<LoginResponse>(backendBaseUrl +'/auth/signin', userCredentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  public logout() {
    this.accessToken = null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    if (error.status === 0) {
      return throwError('The server is currently unavailable.' + '\n' + 'Please try again later.')
    }
    return throwError(error.error.message);
  }

  public isLoggedIn(): boolean {
    return !(this.accessToken == null);
  }
}
