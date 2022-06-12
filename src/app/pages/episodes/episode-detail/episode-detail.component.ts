import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Episode } from '../interfaces/episode.interface';
import { EpisodeService } from '../services/episode.service';
import { CharacterService } from '../../characters/services/character.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit, OnDestroy {

  episode$: Observable<Episode> = new Subject<any>();
  isLoading: boolean = false;
  episode:Episode | undefined;
  characters: any = [];

  constructor(private route:ActivatedRoute, private episodeSvc:EpisodeService, private location:Location, private characterService:CharacterService) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.getEpisodeDetails(id);
    });
  }

  getEpisodeDetails(id:number):void {
    this.episodeSvc.getEpisodeDetails(id).subscribe((data: any) => {
      this.episode = data;
      let characters = data.characters.map((resident: string) => {
        return resident.split('/').pop();
      });
      for (let i = 0; i < characters.length; i++) {
        this.characterService.getCharacterDetail(characters[i]).subscribe((data: any) => {
            this.characters.push(data);
        });
      }
    });
  }

  getCharacterdetails(id:string | null):void {
    this.characterService.getCharacterDetail(id);
  }

  /**
   * On back button
   */
  onGoBack():void{
    this.location.back();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe
  }
}
