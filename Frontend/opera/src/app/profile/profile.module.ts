import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { RouterModule } from '@angular/router';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ProfileRoutingModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
