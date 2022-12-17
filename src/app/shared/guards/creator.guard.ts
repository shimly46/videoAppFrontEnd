import { UserServiceService } from './../../services/userService/user-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, Route, UrlSegment, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorGuard implements CanActivate,CanActivateChild {
  constructor(private router: Router, public jwtHelper: JwtHelperService,
    private _userService:UserServiceService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isItCreator(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isItCreator(state.url);
  }


  async isItCreator(url: string): Promise<boolean>{
    let isCreator=this._userService.isCreator;
    if(isCreator)
        return true;
    else{
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
      return false; 
    }
           
}


}
