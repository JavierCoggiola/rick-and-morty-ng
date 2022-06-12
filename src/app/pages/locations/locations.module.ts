import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationComponent } from './location/location.component';
import { LocationListComponent } from './location-list/location-list.component';

@NgModule({
  declarations: [
    LocationComponent,
    LocationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LocationsModule { }
