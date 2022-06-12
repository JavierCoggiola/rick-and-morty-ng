import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Episode } from '../interfaces/episode.interface';
import { EpisodeService } from '../services/episode.service';
import { CharacterService } from '../../characters/services/character.service';
import { Character } from '../../characters/interfaces/character.interface';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
})
export class EpisodeDetailComponent implements OnInit, OnDestroy {

  episode$: Observable<Episode> = new Subject<any>();
  episode:Episode | undefined;
  characters: any = [];
  subscriptions: Subscription[] = [];

  constructor(private route:ActivatedRoute, private episodeSvc:EpisodeService, private location:Location, private characterService:CharacterService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.pipe(take(1)).subscribe((params) => {
        const id = params['id'];
        this.getEpisodeDetails(id);
      })
    )
  }

  getEpisodeDetails(id:number):void {
    this.subscriptions.push(
      this.episodeSvc.getEpisodeDetails(id).subscribe((data: any) => {
        this.episode = data;
        let characters = data.characters.map((resident: string) => {
          return resident.split('/').pop();
        });
        for (let i = 0; i < characters.length; i++) {
        this.subscriptions.push(
          this.characterService.getCharacterDetail(characters[i]).subscribe((data: Character) => {
              this.characters.push(data);
          })
        )
        }
      })
    );
  }

  /**
   * On back button
   */
  onGoBack():void{
    this.location.back();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
