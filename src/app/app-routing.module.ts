import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/characters/list', pathMatch: 'full' },
  { path: 'characters', 
    loadChildren: () => 
      import(
        './pages/characters/characters.module'
      ).then(m => m.CharactersModule) },
  { path: 'episodes', 
    loadChildren: () => 
      import(
        './pages/episodes/episodes.module'
      ).then(m => m.EpisodesModule) },
  { path: 'locations', 
    loadChildren: () => 
      import(
        './pages/locations/location-list/location-list.module'
      ).then(m => m.LocationListModule) },
  {path: '**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
