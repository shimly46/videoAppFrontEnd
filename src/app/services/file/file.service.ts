import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { REQUESTTYPE } from "src/app/models/enum/request-type.enum";
import { DataService } from "src/app/shared/async-services/data.service";


@Injectable({
    providedIn: 'root'
  })
export class FileService {


    constructor(private _dataService: DataService){}


    uploadFile(file:any){
        return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'users/upload', file)
    }

    addURL(formData: FormGroup){
        return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'users/addURL', formData)
    }
}
