import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { Character } from '../interfaces/character.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) {}

  /**
   * Obtiene listado de personajes según término de búsqueda desde la API rickandmorty
   * @param query Término de búsqueda
   * @param pageIndex 
   * @returns Listado de personajes
   */
  searchCharacters(query = '', pageIndex = 200):Observable<Character[]> {
    const url = `${environment.baseUrlAPI+environment.characterUrlAPI}?name=${query}&page=${pageIndex}`;
    return this.http.get<Character[]>(url)
    .pipe(
      map(response => response),
      catchError( error => {
        return throwError(() => error);
      }));
  }

  /**
   * Obtiene el detalle de un personaje
   * @param id id of character
   * @returns Observable of Character
   */
  getCharacterDetail(id: string | null):Observable<Character> {
    const url = `${environment.baseUrlAPI+environment.characterUrlAPI}${id}`;
    return this.http.get<Character>(url)
    .pipe(
      map(response => response),
      catchError( error => {
        return throwError(() => error);
      }));
  }

}
