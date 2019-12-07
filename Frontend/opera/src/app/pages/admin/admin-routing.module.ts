import { ApproveAuthorityComponent } from './approve-authority/approve-authority.component';
import { NgModule } from '@angular/core';
import { RemoveUsersComponent } from './remove-users/remove-users.component';
import { Routes, RouterModule } from '@angular/router';
import { UpdateAuthorityComponent } from './update-authority/update-authority.component';

const routes: Routes = [
  {
    path: 'approve-authority',
    component: ApproveAuthorityComponent
  },
  {
    path: 'remove-users',
    component: RemoveUsersComponent
  },
  {
    path: 'update-authority',
    component: UpdateAuthorityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
