import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EpisodeComponent } from './episode/episode.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeService } from './services/episode.service';

const routes: Routes = [
  { path: 'list', 
  loadChildren: () => 
  import(
    './episode-list/episode-list.module'
    ).then(m => m.EpisodeListModule) },
  { path: ':id', component: EpisodeDetailComponent }
];

@NgModule({
  declarations: [
    EpisodeComponent,
    EpisodeDetailComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  providers: [
    EpisodeService
  ],
  exports: [
    EpisodeComponent
  ]
})
export class EpisodesModule { }
