import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location.interface';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  searchPlaceholderText:string = "Buscar por ubicación";

  locations: Location[] = [];
  
  isLoadingData:boolean = false;
  
  pageIndex:number = 1;

  totalItems:number = 0;

  private searchValue: string = "";

  constructor(
    private locationSvc: LocationService,
  ) {
  }

  ngOnInit(): void {
    // Llamamos al listado de personajes sin definir un filtro
    this.searchLocations();
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
    this.locations = [];
    this.pageIndex = 1;
    this.searchLocations(location);
  }

  /**
   * Obtiene listado de ubicaciones, total de items e informa si se está cargando la información
   * @param location 
   */
  searchLocations(location:string = ""): void {
    this.isLoadingData = true;
    this.locationSvc
      .searchLocations(location, this.pageIndex)
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;
          this.locations = [...results];
          this.totalItems = info.count;
        } else {
          this.totalItems = 0;
          this.locations = [];
        }
        this.isLoadingData = false;
      }, (error:any) => {
        this.totalItems = 0;
        this.isLoadingData = false;
        console.log(error)
      });
  }

}
