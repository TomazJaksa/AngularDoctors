import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DoctorListComponent, // ✅ Import standalone components here
    DoctorDetailComponent // ✅ Import standalone components here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
