import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListRoutingModule } from './location-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationsModule } from '../locations.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LocationListRoutingModule,
    SharedModule,
    LocationsModule
  ]
})
export class LocationListModule { }
