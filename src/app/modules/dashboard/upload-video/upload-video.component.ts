import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { FileService } from './../../../services/file/file.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { genreList } from '../dashboard-overview/dashboard-overview.component';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {
  userName:string='';
  isCreator:boolean=false;

  constructor(private _fileService:FileService,private fb: FormBuilder,
    private router:Router, private _userService:UserServiceService,
    private _dashboardService:DashboardService) { }
  uploadFileForm: FormGroup = new FormGroup({});
  formData = new FormData();
  thumbnailFile:any={};
  videoLoading:boolean=false;
  genreList: genreList[]=[]

  ngOnInit(): void {
    this.initializeForm();
    this.getGenreList()
    this.userName=this._userService.legalName;
    this.isCreator=this._userService.isCreator;

  }

  uploadFile(){
    this.videoLoading=true;
    this.formData.append('thumbnail',this.thumbnailFile)
    this._fileService.uploadFile(this.formData).subscribe((x)=>{
      if(x.success && x.data){
        this.uploadFileForm.patchValue({'url':x.data.dataURL, 'thumbnail':x.data.thumbnailURL})
        this._fileService.addURL(this.uploadFileForm.value).subscribe((y)=>{
          if(y.success){
            this.videoLoading=false;
            this.initializeForm()
            this.router.navigate(['dashboard'])
          }
        })
      }

    })
  }

  initializeForm(){
    this.uploadFileForm = this.fb.group({
      title: [null, [Validators.required]],
      producer: [null, [Validators.required]],
      genre: ["", [Validators.required]],
      rating: ["", [Validators.required]],
      publisher: ["", [Validators.required]],
      url: [null],
      thumbnail: [null]
    });


  }
  uploadMediaFile(event:any){
    const files = event.target.files;
    this.formData=  new FormData();
    this.formData.append('file', files[0])
  }
  uploadThumbnailFile(event:any){
    const files = event.target.files;
    this.thumbnailFile=files[0];
  }

  getGenreList(){
    this._dashboardService.getGenreList().subscribe((x:any)=>{
      if(x.success && x.data){
        this.genreList=x.data;
      }
    })
  }

}
