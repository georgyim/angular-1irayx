import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HospitalityListComponent } from './hospitality-list/hospitality-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SortComponent } from './sort/sort.component';
import { HospitalityFilterComponent } from './hospitality-filter/hospitality-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalDialogHospitalityComponent } from './modal-dialog/modal-dialog-hospitality.component';

@NgModule({
  declarations: [
    AppComponent,
    HospitalityListComponent,
    SortComponent,
    HospitalityFilterComponent,
    ModalDialogHospitalityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
