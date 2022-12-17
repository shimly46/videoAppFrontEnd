
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HttpServiceModule } from './shared/async-services/http.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginModule } from './modules/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpServiceModule.forRoot(),
    AngularMaterialModule,
    AppRoutingModule,
    NgSelectModule, FormsModule,
    DashboardModule,
    LoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
