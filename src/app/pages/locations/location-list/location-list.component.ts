import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location.interface';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {

  searchPlaceholderText:string = "Buscar por ubicación";

  locations: Location[] = [];
  
  subscriptions: Subscription[] = [];

  isLoadingData:boolean = false;
  
  pageIndex:number = 1;

  totalItems:number = 0;

  private searchValue: string = "";

  private searchUpdate: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  searchUpdate$ = this.searchUpdate.asObservable();

  constructor(
    private locationSvc: LocationService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // Seteamos debounceTime de rxjs para no saturar en llamadas al servidor
      this.searchUpdate$
      .pipe(debounceTime(250))
      .subscribe((value) => {
        this.locations = [];
        this.pageIndex = 1;
        this.searchLocations(value);
      })
    );
  }

  /**
   * Al cambiar de pageIndex se llama al buscador de ubicaciones enviando el valor de filtro existente
   */
  onChangePageIndex():void {
    this.searchLocations(this.searchValue);
  }

  /**
   * Al cambiar los términos de búsqueda se resetean los valores a los iniciales y se llama al método de búsqueda
   * @param location 
   */
  onChangeSearchEpisodes(location:string = ""): void {
    this.searchValue = location;
    this.searchUpdate.next(location);
  }

  /**
   * Obtiene listado de ubicaciones, total de items e informa si se está cargando la información
   * @param location 
   */
  searchLocations(location:string = ""): void {
    this.isLoadingData = true;
    this.subscriptions.push(
      this.locationSvc
      .searchLocations(location, this.pageIndex)
      .subscribe({
        next: (res: any) => {
          if (res?.results?.length) {
            const { info, results } = res;
            this.locations = [...results];
            this.totalItems = info.count;
          } else {
            this.totalItems = 0;
            this.locations = [];
          }
          this.isLoadingData = false;
        },
        error: (error:any) => {
          this.totalItems = 0;
          this.isLoadingData = false;
          console.log(error)
        }
      })
    );
  }

  /**
   * Route to location detail
   * @param location 
   */
   goToLocationDetail(location:Location):void {
    this.router.navigate(['/locations', location.id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
