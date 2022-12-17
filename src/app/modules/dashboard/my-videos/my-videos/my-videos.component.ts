import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { dashBoardData } from '../../dashboard-overview/dashboard-overview.component';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent implements OnInit {

  dashboardListings:dashBoardData[]=[];
  userName:string='';
  isCreator:boolean=false;
  isLoading:boolean=true;
  constructor(                    
    private _dashboardService:DashboardService,
    private _userService:UserServiceService
    ) { }

  ngOnInit(): void {
    this.getData();
    this.userName=this._userService.legalName;
    this.isCreator=this._userService.isCreator;
  }

  getData(){
    this.isLoading=true;
    this.dashboardListings=[]
    this._dashboardService.getMyVideos().subscribe((x)=>{
      if(x.success && x.data){
        this.dashboardListings=x.data;
      }
      this.isLoading=false;

    })
  }





}
