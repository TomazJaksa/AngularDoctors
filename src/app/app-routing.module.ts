import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctor/:id', component: DoctorDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
