import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, OnDestroy {

  searchPlaceholderText:string = "Buscar por personaje";

  characters: Character[] = [];
  
  subscriptions: Subscription[] = [];

  isLoadingData:boolean = false;
  
  pageIndex:number = 1;

  totalItems:number = 0;
  
  private searchValue = "";

  private searchUpdate: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  searchUpdate$ = this.searchUpdate.asObservable();

  constructor(
    private characterSvc: CharacterService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // Seteamos debounceTime de rxjs para no saturar en llamadas al servidor
      this.searchUpdate$
      .pipe(debounceTime(250))
      .subscribe((value) => {
        this.characters = [];
        this.pageIndex = 1;
        this.searchCharacters(value);
      })
    );
  }

  /**
   * Al cambiar de pageIndex se llama al buscador de personajes enviando el valor de filtro existente
   */
  onChangePageIndex():void {
    this.searchCharacters(this.searchValue);
  }

  /**
   * Al cambiar los términos de búsqueda se resetean los valores a los iniciales y se llama al método de búsqueda
   * @param character 
   */
  onChangeSearchCharacters(character:string = ""): void {
    this.searchValue = character;
    this.searchUpdate.next(character);
  }

  /**
   * Obtiene listado de personajes, total de items e informa si se está cargando la información
   * @param character 
   */
  searchCharacters(character:string = ""): void {
    this.isLoadingData = true;
    this.subscriptions.push(
      this.characterSvc
      .searchCharacters(character, this.pageIndex)
      .subscribe({
        next: (res: any) => {
          if (res?.results?.length) {
            const { info, results } = res;
            this.characters = [...results];
            this.totalItems = info.count;
          } else {
            this.totalItems = 0;
            this.characters = [];
          }
          this.isLoadingData = false;
        },
        error: (error:any)  => {
          this.totalItems = 0;
          this.isLoadingData = false;
          console.log(error)
        }
      })
    );
  }

  /**
   * Route to character detail
   * @param character 
   */
  goToCharacterDetail(character:Character):void {
    this.router.navigate(['/characters', character.id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
    
}
