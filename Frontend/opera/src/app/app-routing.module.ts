import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotSignedInGuard } from './guards/not-signedin-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { SignedInGuard } from './guards/signedin-guard.service';

import { CancelEventComponent } from './pages/manager/cancel-event/cancel-event.component';
import { CreateEventsComponent } from './pages/manager/create-events/create-events.component';
import { CreateHallsComponent } from './pages/manager/create-halls/create-halls.component';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CancelReservationComponent } from './pages/customer/cancel-reservation/cancel-reservation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ViewSeatsComponent } from './pages/manager/view-seats/view-seats.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

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
    path: 'cancel-events',
    component: CancelEventComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Opera_Management' }
  },
  {
    path: 'view-seats/:eventId/:hallId',
    component: ViewSeatsComponent,
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
    path: 'edit-profile/:uid',
    component: EditProfileComponent,
    canActivate: [SignedInGuard]
  },
  {
    path: 'my-reservation',
    component: CancelReservationComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Customer' }
  },
  {
    path: 'reservation/:eventId/:hallId',
    component: ReservationComponent,
    canActivate: [RoleGuard],
    data: { authority: 'Customer' }
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
