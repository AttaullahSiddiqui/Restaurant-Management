import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent, NotFound404Component } from './core';

const routes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },{
      path: 'menu',
      loadChildren: './menu/menu.module#MenuModule'
    }]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'public',
      loadChildren: './public/public.module#PublicModule'
    }]
  },{
    path: '**',
    component: NotFound404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// , {
//   path: '**',
//   redirectTo: 'session/404'
// }
