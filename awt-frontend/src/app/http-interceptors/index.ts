/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "./auth-interceptor";
import {ContentTypeInterceptor} from "./content-type-interceptor";



/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true }
];
