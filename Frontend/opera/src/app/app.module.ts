import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

import { AppComponent } from './app.component';
import { CancelEventComponent } from './pages/manager/cancel-event/cancel-event.component';
import { CancelReservationComponent } from './pages/customer/cancel-reservation/cancel-reservation.component';
import { CreateEventsComponent } from './pages/manager/create-events/create-events.component';
import { CreateHallsComponent } from './pages/manager/create-halls/create-halls.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    CancelEventComponent,
    CancelReservationComponent,
    CreateEventsComponent,
    CreateHallsComponent,
    ErrorComponent,
    EventsComponent,
    FooterComponent,
    HomeComponent,
    ManageUsersComponent,
    NavigationComponent,
    ProfileComponent,
    ReservationComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MaterialTimePickerModule,
    ReactiveFormsModule,
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
