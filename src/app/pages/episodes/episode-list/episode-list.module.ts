import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListRoutingModule } from './episode-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EpisodesModule } from '../episodes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EpisodeListRoutingModule,
    SharedModule,
    EpisodesModule
  ]
})
export class EpisodeListModule { }
