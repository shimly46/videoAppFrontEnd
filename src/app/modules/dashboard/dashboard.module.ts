import { JwtHelperService } from '@auth0/angular-jwt';
import { PipesModule } from './../../shared/pipes/index';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoModelComponent } from './video-model/video-model.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MyVideosComponent } from './my-videos/my-videos/my-videos.component';


@NgModule({
  declarations: [
    DashboardOverviewComponent,
    UploadVideoComponent,
    VideoModelComponent,
    SidebarComponent,
    HeaderComponent,
    MyVideosComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    DashboardRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DashboardService,JwtHelperService]
})
export class DashboardModule { }
