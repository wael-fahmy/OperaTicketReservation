import { CreateEventsComponent } from './create-events/create-events.component';
import { CreateHallsComponent } from './create-halls/create-halls.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditHallComponent } from './edit-hall/edit-hall.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Create a new event
  { path: 'create-events', component: CreateEventsComponent },

  // Manage events (Edit or Cancel or View Seats)
  { path: 'manage-events', component: ManageEventsComponent },

  // Edit events
  { path: 'edit-event/:eventID', component: EditEventComponent },

  // Create halls
  { path: 'create-halls', component: CreateHallsComponent },

  // Edit halls
  { path: 'edit-hall/:hallID', component: EditHallComponent },

  // View event seats
  // { path: 'manager/view-event-seats', component: ViewEventSeatsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
