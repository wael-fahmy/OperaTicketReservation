import { CommonModule } from '@angular/common';
import { CreateEventsComponent } from './create-events/create-events.component';
import { CreateHallsComponent } from './create-halls/create-halls.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditHallComponent } from './edit-hall/edit-hall.component';
import { FormsModule } from '@angular/forms';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material';
import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateEventsComponent,
    CreateHallsComponent,
    EditEventComponent,
    EditHallComponent,
    ManageEventsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MatDialogModule
  ]
})
export class ManagerModule { }
