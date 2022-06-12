import { Injectable } from '@angular/core';
import { Episode } from '../interfaces/episode.interface';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class EpisodeService {

  constructor(private http: HttpClient) {}

  /**
   * Obtiene listado de episodios según término de búsqueda desde la API rickandmorty
   * @param query Término de búsqueda
   * @param pageIndex 
   * @returns Listado de episodios
   */
  searchEpisodes(query = '', pageIndex = 200):Observable<Episode[] | ErrorEvent> {
    const url = `${environment.baseUrlAPI + environment.episodeUrlAPI}?name=${query}&page=${pageIndex}`;
    return this.http.get<Episode[]>(url)
    .pipe(
      map(response => response),
      catchError( error => {
        return throwError(() => error);
      }));
  }

  /**
   * Obtiene el detalle de un episodio desde la API rickandmorty
   * @param id 
   * @returns Episode
   */
  getEpisodeDetails(id: number):Observable<Episode> {
    const url = `${environment.baseUrlAPI + environment.episodeUrlAPI}${id}`;
    return this.http.get<Episode>(url)
    .pipe(
      map(response => response),
      catchError( error => {
        return throwError(() => error);
      }));
  }
  
}
