import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router, private _userService:UserServiceService) { }
  onDashboard:boolean=false;
  isCreator:boolean=false;

  ngOnInit(): void {
    if(window.location.href==window.origin+'/dashboard' || 
    window.location.href==window.origin+'/dashboard/upload' ||
    window.location.href.indexOf("/dashboard/view-video") > -1){
      this.onDashboard=true;
    }
    else
      this.onDashboard=false;

    this.isCreator=this._userService.isCreator;
  }

  signOut(){
    localStorage.setItem("access_token", '');
    this.router.navigate(['login']);

}

}
