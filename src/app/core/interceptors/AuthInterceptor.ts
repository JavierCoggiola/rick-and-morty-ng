import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'; 
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private notification: NzNotificationService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        return next.handle(request).pipe(catchError(error => {
            const errorMsg = error.error.error || 'No hay resultados';
            // Generamos notificación de error mediante el servicio NOTIFICATION de NgZorro
            if(errorMsg) {
                this.notification.remove();
                this.notification.error(errorMsg,"");
            }
            return throwError(errorMsg);
        }));
    }
}