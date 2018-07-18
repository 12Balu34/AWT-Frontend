import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {backendBaseUrl} from "../../app-constants/backend-url";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {LoginResponse} from "../../model/login-response";
import {BackendUser} from "../../model/backend-user";
import {User} from "../../model/user";
import {UpdateUser} from "../../model/update-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor(private http: HttpClient) {
    console.log('Authservice instantiated');
  }


  public getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  public setAccessToken(value: string) {
    localStorage.setItem('accessToken', value);
    }

  public login(userCredentials) {
    console.log('LoginService accessed ' + userCredentials.toString())
    return this.http.post<LoginResponse>(backendBaseUrl +'/auth/signin', userCredentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  public logout() {
    this.user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  }

  public isLoggedIn(): boolean {
    return !(localStorage.getItem('accessToken') == null);
  }

  public getRole(): string {
    return localStorage.getItem('role');
  }

  public isManager(): boolean {
    return localStorage.getItem('role') == 'MANAGER';
  }

  public initializeGlobalUser () {
    return this.http.get<BackendUser>(backendBaseUrl + '/users/me')
      .pipe(
        map(data=> {
          this.user = new User(data.username, data.email, data.password, data.roles[0].name);
          localStorage.setItem('role',data.roles[0].name);
        },
        catchError(this.handleError)
      ));
  }

  public getCurrentUser(): User {
    return this.user;
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

  public updateUser(updateUser: UpdateUser) {
    return this.http.put(backendBaseUrl + "/users/me", updateUser)
      .pipe(
        map(
          data => {
            this.user.username = updateUser.username;
            this.user.email = updateUser.email;
            this.user.password = updateUser.password;
          },
          catchError(this.handleError)
        ));
  }
}
