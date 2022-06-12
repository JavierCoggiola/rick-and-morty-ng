import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Location } from '../interfaces/location.interface';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) {}

  /**
   * Obtiene listado de ubicaciones según término de búsqueda desde la API rickandmorty
   * @param query Término de búsqueda
   * @param pageIndex 
   * @returns Listado de ubicaciones
   */
  searchLocations(query = '', pageIndex = 200):Observable<Location[] | ErrorEvent> {
    const url = `${environment.baseUrlAPI + environment.locationUrlAPI}?name=${query}&page=${pageIndex}`;

    return this.http.get<Location[]>(url)
    .pipe(
      map(response => response),
      catchError( error => {
        return throwError(() => error);
      }));
  }

  /**
   * Obtiene el detalle de una location desde la API rickandmorty
   * @param id 
   * @returns Location
   */
   getLocationDetails(id: number):Observable<Location> {
    const url = `${environment.baseUrlAPI + environment.locationUrlAPI}${id}`;
    return this.http.get<Location>(url)
    .pipe(
      map(response => response),
      catchError( error => {
        return throwError(() => error);
      }));
  }
}
