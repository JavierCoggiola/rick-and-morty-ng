import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Location } from '../interfaces/location.interface';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent implements OnInit {

  @Input() location:Location = {} as Location;

  constructor() { }

  ngOnInit(): void {
  }

}
