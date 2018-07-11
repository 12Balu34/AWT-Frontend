import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

export class ContentTypeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const cloned = req.clone({
      headers: req.headers.set('Content-Type',
        'application/json'),
    });
      // send cloned request with header to the next handler.
      return next.handle(cloned);
    }
}
