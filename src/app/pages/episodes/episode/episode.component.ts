import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Episode } from '../interfaces/episode.interface';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeComponent implements OnInit {

  @Input() episode:Episode = {} as Episode;
  
  constructor() { }

  ngOnInit(): void {
  }

}
