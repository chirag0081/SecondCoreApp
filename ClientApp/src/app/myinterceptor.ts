import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, finalize } from "rxjs/operators";
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderService } from './loader.service';

export class Myinterceptor implements HttpInterceptor {

  constructor(private router: Router, private navBar: NavbarComponent, private loaderService: LoaderService) {}
  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const authReq = req.clone({
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    });

    return next.handle(authReq).pipe(
      tap(event => {
        status = '';
        if (event instanceof HttpResponse) {
          status = 'succeeded';
        }
      },
        error => {
          this.loaderService.hide();
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401 && error.statusText == "Unauthorized") {
              this.navBar.userName = '';
              localStorage.removeItem('Token');
              localStorage.removeItem('LoggedInUser');
              localStorage.removeItem('LoggedInUserRoles');
              this.router.navigate(['/login']);

            }
          }
        }
      ),
      finalize(() => {
        this.loaderService.hide();
        const message = req.method + " " + req.urlWithParams + " " + status;
      })
    );

  }

}
