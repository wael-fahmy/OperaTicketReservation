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
import { CreateEventsComponent } from './pages/manager/create-events/create-events.component';
import { CreateHallsComponent } from './pages/manager/create-halls/create-halls.component';
import { EditEventComponent } from './pages/manager/edit-event/edit-event.component';
import { EditHallComponent } from './pages/manager/edit-hall/edit-hall.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ManageEventsComponent } from './pages/manager/manage-events/manage-events.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventsComponent,
    CreateHallsComponent,
    EditEventComponent,
    EditHallComponent,
    ErrorComponent,
    FooterComponent,
    HomeComponent,
    ManageEventsComponent,
    ManageUsersComponent,
    NavigationComponent,
    ProfileComponent,
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
