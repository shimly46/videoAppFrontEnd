import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-video-model',
  templateUrl: './video-model.component.html',
  styleUrls: ['./video-model.component.css']
})
export class VideoModelComponent implements OnInit {

  videoID:any=null;
  videoData:mediData=new mediData();
  newComment:string='Great Video';
  userName:string='';
  isCreator:boolean=false;

  constructor(private _router:ActivatedRoute,private _dashboardService:DashboardService,
    private _userService:UserServiceService) { }

  ngOnInit(): void {
    this.videoID=this._router.snapshot.paramMap.get('mediaID');
    this.getVideoData();
    this.userName=this._userService.legalName;
    this.isCreator=this._userService.isCreator;

  }

  getVideoData(){
    this._dashboardService.getVideoData(this.videoID).subscribe((x:any)=>{
      if(x.success && x.data){
        this.videoData=x.data
        this.videoData.comments ? this.videoData.comments= this.videoData.comments: this.videoData.comments=[]
      }

    })
  }

  addNewComment(){
    
    this._dashboardService.addNewComment(this.videoID,this.newComment).subscribe((x:any)=>{
      if(x.success && x.data){
        
        this.videoData.comments.unshift(x.data) 
        this.newComment='';
        
      }

    })
  }

}

export class mediData{
  videoURL:string='';
  title:string='';
  producer:string='';
  genre:string='';
  rating:string='';
  comments:commentData[]=[]

}

export class commentData{
  comment:string='';
  createdBy:string='';
  createdAt:string='';
}
