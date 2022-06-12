import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { Episode } from '../interfaces/episode.interface';
import { EpisodeService } from '../services/episode.service';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
 
  searchPlaceholderText:string = "Buscar por episodio";

  episodes: Episode[] = [];
  
  isLoadingData:boolean = false;
  
  pageIndex:number = 1;

  totalItems:number = 0;

  private searchValue: string = "";

  private searchUpdate: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  searchUpdate$ = this.searchUpdate.asObservable();

  constructor(
    private episodeSvc: EpisodeService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    // Seteamos debounceTime de rxjs para no saturar en llamadas al servidor
    this.searchUpdate$
      .pipe(debounceTime(250))
      .subscribe((value) => {
        this.episodes = [];
        this.pageIndex = 1;
        this.searchEpisodes(value);
      });
  }

  /**
   * Al cambiar de pageIndex se llama al buscador de episodios enviando el valor de filtro existente
   */
  onChangePageIndex():void {
    this.searchEpisodes(this.searchValue);
  }

  /**
   * Al cambiar los términos de búsqueda se resetean los valores a los iniciales y se llama al método de búsqueda
   * @param episode 
   */
  onChangeSearchEpisodes(episode:string = ""): void {
    this.searchValue = episode;
    this.searchUpdate.next(episode);
  }

  /**
   * Obtiene listado de episodios, total de items e informa si se está cargando la información
   * @param episode 
   */
  searchEpisodes(episode:string = ""): void {
    this.isLoadingData = true;
    this.episodeSvc
      .searchEpisodes(episode, this.pageIndex)
      .subscribe({
        next: 
          (res: any) => {
            if (res?.results?.length) {
              const { info, results } = res;
              this.episodes = [...results];
              this.totalItems = info.count;
            } else {
              this.totalItems = 0;
              this.episodes = [];
            }
            this.isLoadingData = false;
        },
        error: (error:any) => {
            this.totalItems = 0;
            this.isLoadingData = false;
            console.log(error)
        }
      });
  }

  /**
   * Route to episode detail
   * @param episode 
   */
  goToEpisodeDetail(episode:Episode):void {
    this.router.navigate(['/episodes', episode.id]);
  }

}
