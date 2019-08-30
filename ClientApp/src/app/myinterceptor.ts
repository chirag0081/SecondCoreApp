import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from "rxjs/operators";

export class Myinterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedRequest = req.clone({

      headers: req.headers.set("Authorization", "Some-dummyCode")

    });
    console.log("Before making api call : ");
    
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },

        error => {
          if (event instanceof HttpResponse) {
            debugger;
            console.log("api call error :", event);

          }
        }
      )
    );
  }

}
