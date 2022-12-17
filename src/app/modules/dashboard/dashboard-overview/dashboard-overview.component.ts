import { UserServiceService } from './../../../services/userService/user-service.service';
import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  dashboardListings:dashBoardData[]=[];
  userName:string='';
  openDropDown:boolean=false;
  searchString:string='';
  isCreator:boolean=false;
  selectedTab:number=0;
  genreList: genreList[]=[];
  isLoading:boolean=true;
  constructor(                    
    private router:Router,
    private _dashboardService:DashboardService,
    private _userService:UserServiceService
    ) { }

  ngOnInit(): void {
    this.getData();
    this.getGenreList()
    this.userName=this._userService.legalName;
    this.isCreator=this._userService.isCreator;
  }

  getData(){
    this.isLoading=true;
    this.dashboardListings=[]
    this._dashboardService.getDashboardData(this.searchString,this.selectedTab).subscribe((x)=>{
      if(x.success && x.data){
        this.dashboardListings=x.data;
      }
      this.isLoading=false;

    })
  }

  getGenreList(){
    this._dashboardService.getGenreList().subscribe((x:any)=>{
      if(x.success && x.data){
        this.genreList=x.data;
      }
    })
  }


  searchMovie(){
    this.getData();
  }

  changeGenre(genreID:number){
    this.selectedTab=genreID;
    this.getData()
  }




}

export class dashBoardData{
  id:number=0;
  ageRating:string='';
  createdAt:string='';
  createdBy:string='';
  producer:string='';
  publisher:string='';
  thumbnail:string='';
  videoTitle:string='';
  videoURL:string='';
}




export class genreList{
  id: number=0;
  genre: string='';
}