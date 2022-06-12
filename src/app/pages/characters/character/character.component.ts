import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CharacterComponent implements OnInit {
  @Input() character:Character = {} as Character;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Retorna URL (string) de episodio random recibida una lista de episodios
   * @param episodes Lista de url episodios
   * @returns  URL (string) de episodio random
   */
  getRandomEpisode(episodes:[string]):string {
    const randomEpisode = Math.floor(Math.random() * episodes.length);
    return episodes[randomEpisode];
  }

}
