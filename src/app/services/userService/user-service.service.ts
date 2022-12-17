import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService { 
    userID: number = 0;
    legalName: string = '';
    email: string = ''; 
    permissions: Array<string> = [];
    profilePictureID: number = 0;
    isCreator: boolean = false;
  
    constructor() { }
    
}
