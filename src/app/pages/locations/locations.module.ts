import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationComponent } from './location/location.component';
import { RouterModule, Routes } from '@angular/router';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationService } from './services/location.service';

const routes: Routes = [
  { path: 'list', 
  loadChildren: () => 
  import(
    './location-list/location-list.module'
    ).then(m => m.LocationListModule) },
  { path: ':id', component: LocationDetailComponent }
];
@NgModule({
  declarations: [
    LocationComponent,
    LocationDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    LocationService
  ],
  exports: [
    LocationComponent
  ]
})
export class LocationsModule { }
