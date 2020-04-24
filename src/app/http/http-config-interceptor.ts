import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SessionService } from '../open-api/api/session.service';
import { AuthService } from '../pages/auth/auth.service';
import { AppMessageService } from '../services/app-message.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 401: {
          this.catchUnauthorizedError();
          break;
        }
        case 498: {
          const sessionService = this.injector.get(SessionService);
          return sessionService.refreshToken(sessionStorage.getItem("refresh-token"), 'response').pipe(switchMap(
            (data => {
              //If reload successful update tokens
              if (data.status == 200) {
                // Update tokens
                sessionStorage.setItem("access-token", data.body.accessToken);
                sessionStorage.setItem("refresh-token", data.body.refreshToken);
                //Clone our fieled request ant try to resend it
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + data.body.accessToken) });

                return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
                  this.injector.get(AppMessageService).addRequestErrorMessage(request, err)
                  return new Observable<HttpEvent<any>>();
                }));
              } else {
                //Logout from account
                const authService = this.injector.get(AuthService);
                authService.logout();
                location.reload(true);
              }
            }
            )));
        }
      }

      this.injector.get(AppMessageService).addRequestErrorMessage(request, err)
      return new Observable<HttpEvent<any>>();
    }));
  }

  private catchUnauthorizedError() {
    // auto logout if 401 response returned from api
    const authService = this.injector.get(AuthService);
    authService.logout();
    location.reload(true);
  }
}
