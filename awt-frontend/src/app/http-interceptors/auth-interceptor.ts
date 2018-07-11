import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const accessToken = this.auth.getAccessToken();

    if (accessToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({ setHeaders: { Authorization: accessToken } });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    else{
      return next.handle(req);
    }
  }
}
