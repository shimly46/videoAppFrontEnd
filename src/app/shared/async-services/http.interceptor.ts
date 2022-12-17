import { UserServiceService } from './../../services/userService/user-service.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Location  } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private location: Location,private _userService:UserServiceService, public jwtHelper: JwtHelperService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token =  localStorage.getItem("access_token");
    if(!access_token){
      access_token = '';
    }

    if(!this._userService.userID &&  !this.jwtHelper.isTokenExpired(access_token)){
      let result = this.jwtHelper.decodeToken(access_token);
      let user = result;
      this._userService.email = user.email;
      this._userService.legalName = user.name;
      this._userService.userID = user.id;
      this._userService.isCreator = user.isCreator==0 ? false:true;
    }
  
    const customReq = request.clone({      
      headers: request.headers
                  .set("authorization","bearer "+access_token)
    });    
    

    return next.handle(customReq).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
 
        }
      }),
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }
        return throwError(response);
      })
    );
  }
}
