import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UrlNumberGuard } from '../guards/url-number-guard.service';
import { UrlGuard } from '../guards/url-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [UrlNumberGuard],
    data: { snapshotInteger: 'uid' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UrlNumberGuard]
})
export class ProfileRoutingModule {}
