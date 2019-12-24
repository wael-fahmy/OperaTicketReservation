import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { NotSignedInGuard } from './guards/not-signedin-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SignedInGuard } from './guards/signedin-guard.service';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateEventsComponent } from './pages/manager/create-events/create-events.component';
import { CreateHallsComponent } from './pages/manager/create-halls/create-halls.component';
import { EditEventComponent } from './pages/manager/edit-event/edit-event.component';
import { EditHallComponent } from './pages/manager/edit-hall/edit-hall.component';
import { ManageEventsComponent } from './pages/manager/manage-events/manage-events.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // Guest
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [NotSignedInGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotSignedInGuard]
  },
  // Admin
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Site_Administrator' }
  },
  // Manager
  {
    path: 'create-event',
    component: CreateEventsComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Opera_Management' }
  },
  {
    path: 'create-hall',
    component: CreateHallsComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Opera_Management' }
  },
  {
    path: 'edit-event',
    component: EditEventComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Opera_Management' }
  },
  {
    path: 'edit-hall',
    component: EditHallComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Opera_Management' }
  },
  {
    path: 'manage-events',
    component: ManageEventsComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Opera_Management' }
  },
  // Customer
  {
    path: 'profile/:uid',
    component: ProfileComponent,
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
