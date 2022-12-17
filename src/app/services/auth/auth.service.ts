import { Injectable } from '@angular/core';
import { REQUESTTYPE } from 'src/app/models/enum/request-type.enum';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/async-services/data.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _dataService: DataService) { }
 
  login(formData: FormGroup){
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/login', formData)
  }
  signUpViaEmail(formData: FormGroup){
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/create-new-user', formData)
  }


}