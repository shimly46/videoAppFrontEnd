import { Injectable } from "@angular/core";
import { REQUESTTYPE } from "src/app/models/enum/request-type.enum";
import { DataService } from "src/app/shared/async-services/data.service";


@Injectable()
export class DashboardService {

    constructor(private _dataService: DataService){}

    getDashboardData(searchString:string,genreID:number){
        return this._dataService.genericServiceCaller(REQUESTTYPE.GET, `dashboard/get-dashboard-data?searchString=${searchString}&genreID=${genreID}`)
    }
    getGenreList(){
        return this._dataService.genericServiceCaller(REQUESTTYPE.GET, 'dashboard/get-genre-list')
    }
    getVideoData(videoID:number){
        return this._dataService.genericServiceCaller(REQUESTTYPE.GET, `dashboard/get-video-data?videoID=${videoID}`)
    }

    addNewComment(videoID:number,comment:string){
        let data={videoID,comment}
        return this._dataService.genericServiceCaller(REQUESTTYPE.POST, `dashboard/add-new-comment`,data)
    }
    getMyVideos(){
        return this._dataService.genericServiceCaller(REQUESTTYPE.GET, `dashboard/get-my-videos`)
    }
    
}
