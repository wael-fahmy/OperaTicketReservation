import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { NotSignedInGuard } from './guards/not-signedin-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SignedInGuard } from './guards/signedin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
    canActivate: [NotSignedInGuard]
  },
  {
    path: 'manager',
    loadChildren: () => import('./pages/manager/manager.module').then(mod => mod.ManagerModule),
    canActivate: [RoleGuard],
    data: { authority: '1' }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [RoleGuard],
    data: { authority: '0' }
  },
  {
    path: 'profile/:uid',
    loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule),
    canActivate: [SignedInGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule],
  providers: [NotSignedInGuard, RoleGuard, SignedInGuard]
})
export class AppRoutingModule { }
