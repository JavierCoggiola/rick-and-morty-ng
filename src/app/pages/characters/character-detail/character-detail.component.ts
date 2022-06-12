import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { CharacterService } from '../services/character.service';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent implements OnInit {

  character$: Observable<Character> = new Subject<any>();
  id: string | null = this.route.snapshot.paramMap.get('id');

  constructor(private route:ActivatedRoute, private location:Location, private characterService:CharacterService) {
  }

  ngOnInit(): void {
    this.getCharacterdetails(this.id);
  }

  getCharacterdetails(id:string | null):void {
    this.character$ = this.characterService.getCharacterDetail(id);
  }

  /**
   * On back button
   */
  onGoBack():void{
    this.location.back();
  }


}
