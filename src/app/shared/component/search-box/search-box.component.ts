import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  // Placeholder text
  @Input() searchPlaceholderText = "Buscar";
  @Output() emitSearchBoxValue = new EventEmitter<string>();
  searchBoxValue:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onChangeSearchBoxValue(value:string="") {
    this.emitSearchBoxValue.emit(value);
  }
}
