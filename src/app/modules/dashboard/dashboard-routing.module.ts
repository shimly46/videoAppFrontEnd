import { MyVideosComponent } from './my-videos/my-videos/my-videos.component';
import { VideoModelComponent } from './video-model/video-model.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CreatorGuard } from 'src/app/shared/guards/creator.guard';

const routes: Routes = [

  { path: '', component: DashboardOverviewComponent,canActivate:[AuthGuard]},
  { path: 'upload', component: UploadVideoComponent,canActivate:[AuthGuard,CreatorGuard]},
  { path: 'view-video/:mediaID', component: VideoModelComponent,canActivate:[AuthGuard]},
  { path: 'my-videos', component: MyVideosComponent,canActivate:[AuthGuard,CreatorGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
