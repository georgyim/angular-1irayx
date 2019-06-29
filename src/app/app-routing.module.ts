import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalityListComponent } from './hospitality-list/hospitality-list.component';

const routes: Routes = [
  { path: 'hospitality-list', component: HospitalityListComponent },
  { path: '',
    redirectTo: '/hospitality-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
