import { LayoutRoutingModule } from './layout/layout-routing.module';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', loadChildren: () => import('src/app/layout/layout.module').then(m => m.LayoutModule)
  },
  // {
  //   path: 'dashboard', loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  // }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
