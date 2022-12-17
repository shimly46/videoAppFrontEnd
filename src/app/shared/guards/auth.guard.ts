import { UserServiceService } from './../../services/userService/user-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, Route, UrlSegment, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(private router: Router, public jwtHelper: JwtHelperService,
    private _userService:UserServiceService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }


  async checkLogin(url: string): Promise<boolean> {
    let data :any = this.getQueryParams(url);
    if(data.hasOwnProperty('access_token')){
      let result = this.jwtHelper.decodeToken(data['access_token']);
      this.setUserDetails(data['access_token'],result);
      return true;
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      var validToken = !this.jwtHelper.isTokenExpired(token);
      if (validToken) {
        return true;
      }
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    return false;
  }

  getQueryParams(url:string){
    let obj :any = {};
    let queryparams :any = url.split("?").pop();
    queryparams.split("&").forEach((x:any)=>{
      obj[x.trim().split("=")[0]]=x.trim().split("=")[1]
    })
    return obj;
    
  }
  setUserDetails(token:string,data:any) {
    localStorage.setItem("access_token", token);

    let user = data;
    this._userService.email = user.email;
    this._userService.legalName = user.name;
    this._userService.userID = user.id;
    this._userService.isCreator = user.isCreator==0 ? false:true;

    this.router.navigate(['dashboard']);
  }


}
