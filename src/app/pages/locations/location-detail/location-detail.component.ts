import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location as LocationAngular } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CharacterService } from '../../characters/services/character.service';
import { Character } from '../../characters/interfaces/character.interface';
import { Location } from '../interfaces/location.interface';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit, OnDestroy {

  location$: Observable<Location> = new Subject<any>();
  location:Location | undefined;
  characters: any = [];
  subscriptions: Subscription[] = [];

  constructor(private route:ActivatedRoute, private locationService:LocationService, private locationNg:LocationAngular, private characterService:CharacterService) { }

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
      this.locationService.getLocationDetails(id).subscribe((data: any) => {
        this.location = data;
        let characters = data.residents.map((resident: string) => {
          return resident.split('/').pop();
        });
        for (let i = 0; i < characters.length; i++) {
          this.subscriptions.push(this.characterService.getCharacterDetail(characters[i]).subscribe((data: Character) => {
            this.characters.push(data);
          }));
        }
      })
    )
  }

  /**
   * On back button
   */
  onGoBack():void{
    this.locationNg.back();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
