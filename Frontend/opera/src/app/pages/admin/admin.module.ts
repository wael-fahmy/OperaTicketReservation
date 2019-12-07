import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApproveAuthorityComponent } from './approve-authority/approve-authority.component';
import { UpdateAuthorityComponent } from './update-authority/update-authority.component';
import { RemoveUsersComponent } from './remove-users/remove-users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    // IncidentTypeAmbComponent
  ApproveAuthorityComponent,
    UpdateAuthorityComponent,
    RemoveUsersComponent],
  exports: [/*MatDialogModule*/]
})
export class AdminModule { }
