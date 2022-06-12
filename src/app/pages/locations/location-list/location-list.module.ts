import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListRoutingModule } from './location-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationListComponent } from './location-list.component';
import { LocationsModule } from '../locations.module';

@NgModule({
  declarations: [
    LocationListComponent
  ],
  imports: [
    CommonModule,
    LocationListRoutingModule,
    LocationsModule,
    SharedModule,
  ]
})
export class LocationListModule { }
